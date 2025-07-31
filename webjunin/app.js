import express from 'express';
import { ApiRouter } from './routes/api_routes.js';
import { corsMiddleware } from './middleware/checkcors.js';
import cookieParser from 'cookie-parser';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express();

// Middlewares
app.use(corsMiddleware());
app.use(cookieParser());
app.disable('x-powered-by');

// Limitar tamaño de payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rutas
app.use('/api/', ApiRouter);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.SERVER_IP}:${process.env.PORT}`);
});
