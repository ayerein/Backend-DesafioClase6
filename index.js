let express = require ('express')
let contenedor = require ('./Contenedor')

const productos = new contenedor('productos.txt')
const PORT = 3001
let app = express()

app.get('/', (req, res, next)=>{
    res.send('Pagina principal')
})

app.get('/productos', async(req, res, next)=>{
    let mostrarProductos = await productos.getAll()
    res.send(mostrarProductos)
})

app.get('/productoRandom', async(req, res, next)=>{
    let productoRandom = await productos.getById()
    res.send(productoRandom)
})

app.listen(PORT, ()=> console.log(`Server on http://localhost:${PORT}`))