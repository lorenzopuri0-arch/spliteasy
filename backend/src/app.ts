import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { authRouter } from './routes/auth';

export const app = express();

app.use(express.json());

app.get('/health', async (_req, res) => {
  res.json({ status: 'ok' });
});

// Gestione errori: deve stare dopo tutte le rotte
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.use('/auth', authRouter);