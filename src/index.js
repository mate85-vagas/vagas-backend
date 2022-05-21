import express from 'express';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import healthCheckRoutes from './routes/healthCheckRoutes.js';
import emailListRoutes from './routes/emailListRoutes.js';
import cors from 'cors';
import connect from './utils/connection.js';
import compression from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import { deleteExpiredJobs } from './utils/schedule.js';

const fileContents = fs.readFileSync('swagger.yml', 'utf8');
const swaggerDocument = yaml.loadAll(fileContents);

const app = express();

//Try connection with db
connect();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/vagas', jobRoutes);
app.use('/usuarios', userRoutes);
app.use('/perfis', profileRoutes);
app.use('/tecnologias', technologyRoutes);
app.use('/habilidades', skillRoutes);
app.use('/health-check', healthCheckRoutes);
app.use('/email-list', emailListRoutes);
app.use('/api-doc/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument[0], { explorer: true }));

deleteExpiredJobs();

app.listen(5000, () => console.log('Server running at port 5000'));
