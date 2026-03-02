import mongoose from 'mongoose'; // Cambio 1: usar import

const HistorySchema = new mongoose.Schema({
    patientEmail: { type: String, required: true, unique: true },
    patientName: String,
    appointments: [
        {
            appointment_id: String,
            date: Date,
            doctor_name: String,
            treatment_description: String,
            cost: Number,
            medications: [
                {
                    name: String,
                    dosage: String
                }
            ]
        }
    ]
}, { 
    timestamps: true 
});

// Cambio 2: usar export default
const PatientHistory = mongoose.model('PatientHistory', HistorySchema);
export default PatientHistory;