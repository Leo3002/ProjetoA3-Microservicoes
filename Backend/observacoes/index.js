const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const mysql = require('mysql2')
require('dotenv').config()
const app = express();
app.use(express.json());

const observacoesPorLembreteId = {};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Observacoes',
    password: 'usjt'

});
//Funçâo de Select
app.get('/observacoes', (req, res) => {
    const sql = "Select * from observacoes"
    connection.query(sql,
        (err, fields) => {
            console.log(err)
            res.send(fields)
        })
});
//Funçâo de Insert
app.post('/observacoes', (req, res) => {

    const id_Lembretes = req.body.id_Lembretes
    const texto = req.body.texto
    const sql = "INSERT INTO observacoes (id_Lembretes, texto) VALUES (?, ?)"
    connection.query(sql, [id_Lembretes, texto],
        (err, results) => {
            console.log(results)
            console.log(err)
            res.send('ok')
        })
});
// Função de Update
app.put('/observacoes', (req, res) => {

    const id_Observacoes = req.body.Id_Observacoes
    const texto = req.body.texto
    const sql = "update observacoes set texto = ? where Id_Observacoes = ?;"
    connection.query(sql, [texto, id_Observacoes],
        (err, results) => {
            console.log(results)
            console.log(err)
            res.send('ok')
        })

});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(5000, (() => {
    console.log('Observacoes. Porta 5000');
}));