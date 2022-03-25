const fs = require ('fs');


class Producto {
    constructor (title, price, thumbnail) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
}

class Contenedor {
    constructor (title, price, thumbnail) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }

    async save (producto) {
            try {
                
                let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
                let contenidoToObj = JSON.parse(contenido)
                
                let newProducto = {
                    title: producto.title,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    id: contenidoToObj.length + 1
                }

                //Procedimiento para no repetir un id.
                let elementoEncontrado = contenidoToObj.find (element => element.id === newProducto.id)

                if (elementoEncontrado === undefined) {
                    contenidoToObj.push(newProducto);
                } else {
                    let newProductoPlus = {
                        title: producto.title,
                        price: producto.price,
                        thumbnail: producto.thumbnail,
                        id: elementoEncontrado.id + 1
                    }
                    contenidoToObj.push(newProductoPlus);
                }

                let contenidoToObjToString = JSON.stringify(contenidoToObj, null, 2)
                await fs.promises.writeFile ('./productos.txt', contenidoToObjToString)
                console.log('nuevo producto guardado!')
            } 
            catch (err) {
                console.log('Hubo un error', err)
            }
    }

    async getById (number) {
            try {
                let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
                let contenidoToObj = JSON.parse(contenido)
                let find = contenidoToObj.find (element => element.id === number)
                if (find === undefined){
                    console.log('El ID buscado no existe')
                } else {
                    console.log(find)
                }
            }
            catch (err) {
                console.log ('Hubo un error buscando el ID');
            }
    }

    async getAll () { 
            try {
                let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
                let contenidoToObj = JSON.parse(contenido)

                return contenidoToObj
            }
            catch (err) {
                console.log(err);
            }
    }

    async deleteById (number) {
            try {
                let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
                let contenidoToObj = JSON.parse(contenido)

                let elementoEncontrado = contenidoToObj.find (element => element.id === number)
                if (elementoEncontrado === undefined) {
                    console.log ('Elemento no encontrado')
                } else {
                    let nuevoArray = contenidoToObj.filter(item => item.id !== elementoEncontrado.id)
                    let nuevoArrayToString = JSON.stringify (nuevoArray, null, 2)
                    await fs.promises.writeFile ('./productos.txt', nuevoArrayToString)
                    console.log('Producto eliminado, nuevo array guardado.')
                }

            }
            catch (err) {
                console.log('Hubo un error, no se encontró el producto con el id ingresado', err)
            }
    }

    async deleteAll () {
            try {
                let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
                let contenidoToObj = JSON.parse (contenido)

                contenidoToObj.length = 0;

                let contenidoToObjToArray = JSON.stringify (contenidoToObj, null, 2)
                await fs.promises.writeFile ('./productos.txt', contenidoToObjToArray)
                console.log ('Se borraron todos los productos')

            }
            catch (err) {
                console.log ('Error al querer borrar un elemento', err);
            }
    }

    async getRandom () {
        try {
            let contenido = await fs.promises.readFile ('./productos.txt', 'utf-8')
            let contenidoToObj = JSON.parse(contenido)

            let numbRandom = Math.floor(Math.random()*contenidoToObj.length+1);
            let elementoEncontrado = contenidoToObj.find (element => element.id === numbRandom);

            if (elementoEncontrado === undefined) {
                console.log ('Elemento no encontrado')
            } else {
                return elementoEncontrado
            }

        }
        catch (err) {
            console.log ('Hubo un error, no funcionó la función getRandom()')
        }
    }
}


const contenedor = new Contenedor ('Contenedor de Productos')

let MacbookAir = new Producto ("Macbook Air", 1500, "url imagen");
let MacbookPro = new Producto ("Macbook Pro", 1700, "url imagen");
let MacStudio = new Producto ("Mac Studio", 2800, "url imagen");
let AirpodsPro = new Producto ("AirpodsPro", 700, "url imagen");
let iPadAir = new Producto ("iPad Air", 800, "url imagen");
let iPadMini = new Producto ("iPad Mini", 800, "url imagen");
let iPadPro = new Producto ("iPad Pro", 1200, "url imagen");
let iPhone13Pro = new Producto ("iPhone 13 Pro", 1500, "url imagen")

// contenedor.save(MacbookAir);
// contenedor.save(MacbookPro);
// contenedor.save(MacStudio);
// contenedor.save(AirpodsPro);
// contenedor.save(iPadAir);
// contenedor.save(iPadMini);
// contenedor.save(iPadPro);
// contenedor.save(iPhone13Pro);


// contenedor.getById(4)
// contenedor.getAll()
// contenedor.getRandom();

// contenedor.deleteById(5);
// contenedor.deleteAll()

module.exports = Contenedor;

