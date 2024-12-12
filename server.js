import express from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js';
import cors from 'cors'

const app = express();
const corsOptions = {
    origin: 'https://luxury-daffodil-bfe639.netlify.app', // Permitir apenas essa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Caso precise enviar cookies ou headers como 'Authorization'
};

app.use(express.json());
app.use(cors());

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando');
});