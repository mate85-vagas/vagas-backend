import express from 'express';
import db from './config/database.js';
import vagaRoutes from './routes/vagaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cors from 'cors';
 
const app = express();
 
try {
    await db.authenticate();
    await db.sync();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use('/vagas', vagaRoutes);
app.use('/usuarios',usuarioRoutes);
 
app.listen(5000, () => console.log('Server running at port 5000'));
