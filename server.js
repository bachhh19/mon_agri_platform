require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Connection à MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json());

app.get('/api/weather', async (req, res) => {
    try {
        const response = await axios.get(process.env.WEATHER_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des données météo.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
