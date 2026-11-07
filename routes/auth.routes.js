import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Debe ingresar email y contraseña' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.*, r.nombre AS rol 
       FROM usuarios u 
       JOIN roles r ON u.id_rol = r.id 
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const usuario = rows[0];

    // Compara hash bcrypt o texto plano directo para desarrollo inicial
    const passwordValido = await bcrypt.compare(password, usuario.password)
      .catch(() => password === usuario.password) || (password === usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET || 'clave_secreta',
      { expiresIn: '8h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;