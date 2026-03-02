// 1. Importaciones de módulos (ES Modules)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Importación de configuraciones de BD (Recuerda el .js)
import pool from './config/db.js';
import connectMongo from './config/mongo.js';

// Importación de Rutas
import uploadRoutes from './routes/upload.routes.js';
import patientRoutes from './routes/patient.routes.js';

const app = express();

// 2. Middlewares Globales
app.use(cors()); // Permite peticiones externas
app.use(express.json()); // Analiza bodies en formato JSON
app.use(express.urlencoded({ extended: true })); // Analiza datos de formularios y URL

// 3. Inicialización de Bases de Datos
// Conexión MongoDB
await connectMongo();

// Verificación de conexión MySQL (Top-level await)
try {
    const connection = await pool.getConnection();
    console.log('MySQL conectado: Pool de conexiones listo');
    connection.release();
} catch (err) {
    console.error('Error crítico en MySQL:', err.message);
    // En una prueba real, podrías decidir si cerrar la app o seguir
}

// 4. Definición de Rutas
// Usamos un prefijo '/api' para mantener el estándar REST
app.use('/api', uploadRoutes);

app.use('/api/patients', patientRoutes);

// Ruta de salud (Health check) para pruebas rápidas
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Servidor funcionando correctamente' 
    });
});

// 5. Encendido del Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado con éxito 
        Puerto: ${PORT}
        URL: http://localhost:${PORT}`);
});