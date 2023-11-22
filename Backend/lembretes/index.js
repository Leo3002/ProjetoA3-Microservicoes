const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2')
require('dotenv').config()
app.use(express.json());
const lembretes = {};
//const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = Banco_lembrete.env
contador = 0;

/*app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.post('/lembretes', async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });
    res.status(201).send(lembretes[contador]);
});*/


app.post('/lembretes'), (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'lembretes',
        password: 'usjt'

    })
    const Nome_Lembretes = req.body.Nome_Lembretes
    const Data_Lembretes = req.body.Data_Lembretes
    const Id_Prioridade = req.body.Id_Prioridade
    const sql = "INSERT INTO Lembretes (Nome_Lembretes, Data_Lembretes, Id_Prioridade, Concluido) VALUES (?, ?, ?, 0)"
    connection.query(sql, [Nome_Lembretes, Data_Lembretes, Id_Prioridade],
        (err, results, fields) => {
            console.log(results)
            console.log(fields)
            res.send('ok')
        })
}
app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});