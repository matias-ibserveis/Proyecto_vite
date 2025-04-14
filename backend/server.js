// backend/server.js
import express from 'express';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())  

// Cargar datos del JSON
const productos = JSON.parse(readFileSync('./backend/data/datos_productos.json'), 'utf-8');

// Rutas
app.get('/productos', (req, res) => {
  res.json(productos);  // Retorna los productos
});

app.post('/productos', (req, res) => {
  const { titulo, precio, proveedor, imagenes, fecha } = req.body;
  const nuevoProducto = {
    id: uuidv4(),
    titulo,
    precio,
    proveedor,
    imagenes,
    fecha
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto); // Responde con el nuevo producto
});

app.listen(port, () => {
  console.log(`Backend en funcionamiento en http://localhost:${port}`);
});
