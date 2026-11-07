import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 1. OBTENER TODAS LAS FUNDAS (Con modelo y categoría)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, m.nombre AS modelo, c.nombre AS categoria
      FROM productos p
      JOIN modelos_iphone m ON p.id_modelo = m.id
      JOIN categorias c ON p.id_categoria = c.id
      ORDER BY p.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. OBTENER MODELOS Y CATEGORÍAS (Para usarlos en selects/desplegables)
router.get('/auxiliares', async (req, res) => {
  try {
    const [modelos] = await pool.query('SELECT * FROM modelos_iphone');
    const [categorias] = await pool.query('SELECT * FROM categorias');
    res.json({ modelos, categorias });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. CREAR UNA FUNDA
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen_url, id_modelo, id_categoria } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, id_modelo, id_categoria) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, stock, imagen_url || 'https://via.placeholder.com/150', id_modelo, id_categoria]
    );
    res.status(201).json({ id: result.insertId, mensaje: 'Funda agregada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ELIMINAR UNA FUNDA
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Funda eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;