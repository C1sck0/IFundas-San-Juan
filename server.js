import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pool from './db.js';

import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import clientesRoutes from './routes/clientes.routes.js'; // <-- 1. IMPORTAR

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.use('/', express.static(path.join(__dirname, 'public/web')));

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes); // <-- 2. REGISTRAR

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