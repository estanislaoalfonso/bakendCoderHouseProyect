const express = require ('express')
const app = express ()
const PORT = 8080
const Contenedor = require ('./contenedor.js')

let contenedorHere = new Contenedor


app.get ('/productos', (req, res) => {
    res.send (contenedorHere.getAll())
})

const server = app.listen(PORT, () => {
    console.log (`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on ("error", error => console.log (`Error en el servidor ${error}`));