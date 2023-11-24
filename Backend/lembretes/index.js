const express = require('express');
const axios = require("axios");
const app = express();
const mysql = require('mysql2')
require('dotenv').config()
app.use(express.json());
const lembretes = {};
contador = 0;
//constante de conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lembretes',
    password: 'usjt'
});
//função de select
app.get('/lembretes', (req, res) => {    
    const sql = "Select * from Lembretes"
    connection.query(sql,
        (err, fields) => {
            console.log(err)
            res.send(fields)
        })
});
//função de insert
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
//função de update
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
//função de delete
app.delete('/observacoes', (req, res) => {

    const id_Observacoes = req.body.Id_Observacoes
    const sql = "DELETE FROM Observacoes WHERE Id_Observacoes = ?;"
    connection.query(sql, [id_Observacoes],
        (err, results) => {
            console.log(results)
            console.log(err)
            res.send('ok')
        })

});
//Manda para o barramento de eventos
app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});
//Me diz a porta que ele está esperando
app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});