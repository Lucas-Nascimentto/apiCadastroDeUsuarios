import express from 'express';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import auth from './middlewares/auth.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Configurar CORS para permitir o frontend específico
const corsOptions = {
    origin: 'https://luxury-daffodil-bfe639.netlify.app', // Substitua pela origem do seu frontend
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); // Ativar o middleware de CORS

// Permitir requisições preflight
app.options('*', cors(corsOptions));

// Configurar rotas
app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando');
});
