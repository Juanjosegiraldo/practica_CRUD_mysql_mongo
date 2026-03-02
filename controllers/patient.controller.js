import pool from '../config/db.js';

// OBTENER TODOS
export const getAllPatients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM patients');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OBTENER UNO POR ID
export const getPatientById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "No encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREAR
export const createPatient = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO patients (name, email, phone, address) VALUES (?, ?, ?, ?)',
            [name, email, phone, address]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR
export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    try {
        await pool.query(
            'UPDATE patients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, email, phone, address, id]
        );
        res.json({ message: "Paciente actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ELIMINAR
export const deletePatient = async (req, res) => {
    try {
        await pool.query('DELETE FROM patients WHERE id = ?', [req.params.id]);
        res.json({ message: "Paciente eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};