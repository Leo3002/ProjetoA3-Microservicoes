const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2')
require('dotenv').config()
app.use(express.json());
const lembretes = {};
contador = 0;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lembretes',
    password: 'usjt'
});

app.get('/lembretes', (req, res) => {    
    const sql = "Select * from Lembretes"
    connection.query(sql,
        (err, fields) => {
            console.log(err)
            res.send(fields)
        })
});
app.post('/lembretes', (req, res) => {
    const Nome_Lembretes = req.body.Nome_Lembretes
    const Data_Lembretes = req.body.Data_Lembretes
    const Id_Prioridade = req.body.Id_Prioridade
    const sql = "INSERT INTO Lembretes (Nome_Lembretes, Data_Lembretes, Id_Prioridade, Concluido) VALUES (?, ?, ?, 0)"
    connection.query(sql, [Nome_Lembretes, Data_Lembretes, Id_Prioridade],
        (err, results) => {
            console.log(results)
            console.log(err)
            res.send('ok')
        })
});
app.put('/lembretes', (req, res) => {
    
    const id_Lembretes = req.body.id_Lembretes
    const concluido = req.body.Concluido
    if (concluido === 0) {
        const sql = "update Lembretes set Concluido  = 1 where id_Lembretes = ?;"
        connection.query(sql, [id_Lembretes],
            (err, results) => {
                console.log(results)
                console.log(err)
                res.send('ok')
            })
    } if (concluido === 1) {
        const sql = "update Lembretes set Concluido  = 0  where id_Lembretes = ?;"
        connection.query(sql, [id_Lembretes],
            (err, results) => {
                console.log(results)
                console.log(err)
                res.send('ok')
            })
    }
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});