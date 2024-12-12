import express from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js';
import cors from 'cors'

const app = express();

app.use(express.json());

// Criar o middleware para permitir requisição externa
app.use((req, res, next) => {
    
    // Qualquer endereço pode fazer requisição "*"
    res.header("Access-Control-Allow-Origin", "*");
    
    // Tipos de método que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    
    // Permitir o envio de dados para API
    res.header("Access-Control-Allow-Headers", "Content-Type");
    
    // Executar o cors
    app.use(cors());

    next();
});


app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando');
});