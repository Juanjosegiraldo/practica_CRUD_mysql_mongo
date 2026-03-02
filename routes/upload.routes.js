import { Router } from 'express';
import multer from 'multer';
import { uploadCSV } from '../controllers/upload.controller.js';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Crea esta carpeta en la raíz

router.post('/bulk', upload.single('file'), uploadCSV);

export default router;