const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:3000'
}));

//Routing
app.get('/', async (req, res) => {
    res.sendFile('./views/index.html', {
        root: __dirname
    });
});

//Spit Steam's data out at another route so that the client side can fetch it.
app.get('/games/:steamId', async (req, res) => {
    const steamId = req.params.steamId;
    const apiKey = process.env.API_KEY;
    const api_url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
});

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {
        root: __dirname
    });
});

//Listen for requests
app.listen(3000);