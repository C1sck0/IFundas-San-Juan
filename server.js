import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

// En ES Modules __dirname se define así:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir estáticos: Plantilla Admin y Web pública
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.use('/', express.static(path.join(__dirname, 'public/web')));

// Ruta de prueba rápida
app.get('/api/ping', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    res.json({ mensaje: 'Conexión a MySQL exitosa', resultado: rows[0].resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  try {
    await pool.query('SELECT 1');
    console.log('Conectado exitosamente a la base de datos MySQL');
  } catch (err) {
    console.error('Error conectando a MySQL:', err.message);
  }
});