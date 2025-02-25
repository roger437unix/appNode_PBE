// npm install -g nodemon

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // ou qualquer outra porta que preferir

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Habilita o CORS para permitir requisições de qualquer origem (em desenvolvimento)
app.use(cors());

var dados = [];
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

// Rota para receber dados do frontend
app.post('/api/dados', (req, res) => {
    const dadosRecebidos = req.body;    
    if (emailRegex.test(dadosRecebidos.email)) {
        dados.push(dadosRecebidos);
        console.log('Dados recebidos do frontend:', dadosRecebidos);

        // Aqui você pode processar os dados, salvar no banco de dados, etc.

        // Envia uma resposta de volta para o frontend
        res.json({ mensagem: 'Dados recebidos com sucesso!' });
    } else {
        console.log('Email inválido => ', dadosRecebidos.email);
        res.json({ mensagem: `Email inválido: ${dadosRecebidos.email}` });
    }        
});

app.get('/api', (req, res) => {
    res.send(dados);
});  

app.listen(port, () => {
    console.log(`Servidor rodando na porta  ${port}`);
});
