const express = require ('express')
const app = express ()
const PORT = 8080
const Contenedor = require ('./contenedor.js')

let contenedor = new Contenedor


app.get ('/productos', async (req, res) => {
    res.send (await contenedor.getAll())
})

app.get ('/productoRandom', async (req, res) => {
    res.send (await contenedor.getRandom())
})



const server = app.listen(PORT, () => {
    console.log (`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on ("error", error => console.log (`Error en el servidor ${error}`));