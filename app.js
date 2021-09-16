const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const apiKey = process.env.API_KEY

//Middleware
app.use(express.static('public'))

app.use(cors({
    origin: `http://localhost:${port}`
}))

//Routing
app.get('/', async (req, res) => {
    res.sendFile('./views/index.html', {
        root: __dirname
    })
})

//GetOwnedGames
app.get('/games/:steamId', async (req, res) => {
    const steamId = req.params.steamId
    const api_url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json)
})

//GetPlayerSummaries
app.get('/userinfo/:steamId', async (req, res) => {
    const steamId = req.params.steamId
    const api_url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&format=json&steamids=${steamId}`

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json)
})

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {
        root: __dirname
    })
})

//Listen for requests
app.listen(port)