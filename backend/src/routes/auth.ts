import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { pool } from '../db/pool';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Dati non validi' });
    return;
  }
  const { email, name, password } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, name, passwordHash],
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Email già registrata' });
      return;
    }
    throw err;
  }
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Dati non validi' });
    return;
  }
  const { email, password } = parsed.data;
  const result = await pool.query(
    'SELECT id, email, name, password_hash FROM users WHERE email = $1',
    [email],
  );
  const user = result.rows[0];
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) {
    res.status(401).json({ error: 'Credenziali non valide' });
    return;
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});