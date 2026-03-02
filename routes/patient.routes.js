import { Router } from 'express';
import { 
    getAllPatients, 
    getPatientById, 
    createPatient, 
    updatePatient, 
    deletePatient 
} from '../controllers/patient.controller.js';

const router = Router();

// Definición de los endpoints
router.get('/', getAllPatients);          // GET /api/patients
router.get('/:id', getPatientById);      // GET /api/patients/1
router.post('/', createPatient);         // POST /api/patients
router.put('/:id', updatePatient);       // PUT /api/patients/1
router.delete('/:id', deletePatient);    // DELETE /api/patients/1

export default router;