import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro
router.post('/cadastro', async (req, res) => {
    try{
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        console.log(user);
        const userDB = await prisma.usuario.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        });

        res.status(201).json(userDB);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no Servidor, tente mais tarde', error: err.message });
    }
    
    
});

//Login

router.post('/login', async (req, res) => {
    try{
        const userInfo = req.body;

        //Busca o usuário no banco de dados
        const user = await prisma.usuario.findUnique({
            where: {email: userInfo.email},
        });

        //Verifica se o usuário existe
        if(!user){
            return res.status(404).json({message: 'Usuário não encontrado'});   
        }

        //Compara a senha que o usuário enviou com a senha criptografada no banco
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if(!isMatch){
            res.status(400).json({message: 'Senha inválida'});
        }

        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1m'});

        res.status(200).json(token);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no Servidor, tente mais tarde', error: err.message });
    }
});

export default router;