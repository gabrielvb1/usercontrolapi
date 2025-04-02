import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config();

const port = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    
})