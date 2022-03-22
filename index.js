import  express  from 'express';
import  jobRoutes from './routes/jobRoutes.js';
import  userRoutes from './routes/userRoutes.js';
import  cors  from 'cors';
import connect from './utils/connection.js';
 
const app = express();
 
//Try connection with db
connect();

app.use(cors());
app.use(express.json());
app.use('/vagas', jobRoutes);
app.use('/usuarios',userRoutes);
 
app.listen(5000, () => console.log('Server running at port 5000'));
