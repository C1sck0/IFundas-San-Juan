import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

const router = express.Router();

// 1. OBTENER TODOS LOS USUARIOS CON SU ROL
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.id_rol, r.nombre AS rol
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id
      ORDER BY u.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. OBTENER TODOS LOS ROLES (para llenar el select del modal)
router.get('/roles', async (req, res) => {
  try {
    const [roles] = await pool.query('SELECT * FROM roles');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. CREAR NUEVO USUARIO
router.post('/', async (req, res) => {
  const { nombre, email, password, id_rol } = req.body;
  if (!nombre || !email || !password || !id_rol) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, id_rol) VALUES (?, ?, ?, ?)',
      [nombre, email, passwordHash, id_rol]
    );

    res.status(201).json({ id: result.insertId, mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR USUARIO
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;