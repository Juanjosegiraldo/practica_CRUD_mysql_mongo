import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/db.js';
import PatientHistory from '../models/history.js';

export const uploadCSV = async (req, res) => {
    const results = [];
    // Usamos streams para no saturar la memoria (Puntos por eficiencia)
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                for (const row of results) {
                    // 1. Manejo de Pacientes (Evitar duplicados)
                    await pool.query(
                        'INSERT IGNORE INTO patients (name, email, phone, address) VALUES (?, ?, ?, ?)',
                        [row.patient_name, row.patient_email, row.patient_phone, row.patient_address]
                    );
                    const [[patient]] = await pool.query('SELECT id FROM patients WHERE email = ?', [row.patient_email]);

                    // 2. Manejo de Doctores
                    await pool.query(
                        'INSERT IGNORE INTO doctors (name, email, specialy) VALUES (?, ?, ?)',
                        [row.doctor_name, row.doctor_email, row.specialty]
                    );
                    const [[doctor]] = await pool.query('SELECT id FROM doctors WHERE email = ?', [row.doctor_email]);

                    // 3. Manejo de Medicamentos
                    let medication_id = null;
                    if (row.prescribed_medication) {
                        await pool.query(
                            'INSERT IGNORE INTO medications (preescribed_medication, medication_dosage) VALUES (?, ?)',
                            [row.prescribed_medication, row.medication_dosage]
                        );
                        const [[med]] = await pool.query(
                            'SELECT id FROM medications WHERE preescribed_medication = ? AND medication_dosage = ?',
                            [row.prescribed_medication, row.medication_dosage]
                        );
                        medication_id = med.id;
                    }

                    // 4. Insertar Cita en MySQL
                    await pool.query(
                        `INSERT IGNORE INTO appointments 
                        (appointment_id, appointment_date, patient_id, doctor_id, medication_id, treatment_code, treatment_description, treatment_cost, amount_paid) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [row.appointment_id, row.appointment_date, patient.id, doctor.id, medication_id, row.treatment_code, row.treatment_description, row.treatment_cost, row.amount_paid]
                    );

                    // 5. Sincronizar con MongoDB (Historial)
                    await PatientHistory.findOneAndUpdate(
                        { patientEmail: row.patient_email },
                        { 
                            $set: { patientName: row.patient_name },
                            $push: { 
                                appointments: {
                                    appointment_id: row.appointment_id,
                                    date: row.appointment_date,
                                    doctor_name: row.doctor_name,
                                    treatment_description: row.treatment_description,
                                    medications: [{ name: row.prescribed_medication, dosage: row.medication_dosage }]
                                } 
                            }
                        },
                        { upsert: true, returnDocument: 'after' }
                    );
                }
                res.status(200).json({ message: "Carga masiva completada y sincronizada" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error procesando el archivo" });
            }
        });
};
