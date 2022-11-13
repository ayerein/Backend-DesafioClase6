let fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async save(obj){
        let traerProductos = await this.getAll() 
        try {
            if (traerProductos.length === 0) {
                const productos = []
                obj.id = 1
                productos.push(obj)
                console.log(`Producto agregado! Id del producto: ${obj.id}`)
                return await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2))
            } else {
                let agregarProductos = JSON.parse(traerProductos)
                obj.id = agregarProductos.length + 1
                agregarProductos.push(obj)
                console.log(`Producto agregado! Id del producto: ${obj.id}`)
                return await fs.promises.writeFile(this.archivo, JSON.stringify(agregarProductos, null, 2))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(){
        let traerProductos = await this.getAll()
        let idRandom = Math.floor(Math.random() * (traerProductos.length) + 1)

        try {
            let producto = traerProductos.find(obj => obj.id === idRandom)
            if (producto) {
                return producto
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let productosTodos = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(productosTodos)
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Contenedor