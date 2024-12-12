import express from 'express';
import {PrismaClient} from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

router.get('/listar-usuarios', async (req, res) => {
    try{
        const users = await prisma.usuario.findMany();
        res.status(200).json({message: 'Usuários listados com sucesso', users});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro no Servidor, tente mais tarde', error: err.message});
    }
});

export default router;
