import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. OBTENER TODOS LOS CLIENTES
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. CREAR UN CLIENTE
router.post('/', async (req, res) => {
  const { nombre, apellido, email, telefono, direccion } = req.body;
  if (!nombre || !apellido || !email) {
    return res.status(400).json({ mensaje: 'Nombre, apellido y email son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, apellido, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, email, telefono || '', direccion || '']
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Cliente agregado correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ mensaje: 'El email ya pertenece a otro cliente' });
    }
    res.status(500).json({ error: error.message });
  }
});

// 3. ELIMINAR UN CLIENTE
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;