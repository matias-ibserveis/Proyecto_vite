const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const API_KEY = 'AIzaSyB8_TQQVI7EGbzkVALOPyiBpwzhA39ZYTQ'; // <-- Pon aquí tu API key
const PLACE_ID = 'ChIJXQJD4PyTlxIR9If2KX-Dy28'; // <-- Pon aquí tu Place ID

app.use(cors()); // Permite peticiones desde tu frontend

app.get('/api/reviews', async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
    const response = await axios.get(url);
    // Muestra toda la respuesta para depurar
    console.log(response.data);
    if (response.data.result && response.data.result.reviews) {
      res.json(response.data.result.reviews);
    } else {
      res.status(404).json({ error: 'No se encontraron reseñas o el Place ID es incorrecto', details: response.data });
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor reviews en http://localhost:3001');
});