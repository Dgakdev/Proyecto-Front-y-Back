const express = require('express')
const cors = require('cors'); // Importa el paquete cors
const app = express()
const port = 3002
// Get the client
const mysql = require('mysql2/promise');

//usa el middleware cors
app.use(cors());

// Create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'login',
    password: '123456789',
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/login', async (req, res) => {
    const datos = req.query;
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?', //datos,usuario
            [datos.usuario, datos.clave]
        );
        if (results.length > 0) {
            res.status(200).send('inicio de sesion exitoso')
        } else {
            res.status(400).send('Informacion incorrecta')
        }

    } catch (err) {
        console.log(err);
    }
});
app.get('/validar', (req, res) => {
    res.send('Sesion Validada')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

