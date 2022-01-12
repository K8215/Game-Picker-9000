//Selectors
const inputId = document.querySelector('#inputId')
const inputCheckbox = document.querySelector('#inputCheckbox')
const buttonSubmit = document.querySelector('#buttonSubmit')
const randContainer = document.querySelector('#randContainer')
const outputRand = document.querySelector('#outputRand')
const playerName = document.querySelector('#playerName')
const buttonRand = document.querySelector('#buttonRand')
const allcontainer = document.querySelector('#allContainer')
const outputTotal = document.querySelector('#outputTotal')
const outputList = document.querySelector('#outputList')
const loader = document.querySelector('#loader')
const errorMessage = 'Could not retrieve games.'

//Init
buttonSubmit.addEventListener('click', function (e) {
    e.preventDefault()

    //Grab user's input
    let steamId = inputId.value

    //Show loader
    loader.style.display = 'block'

    //Display games
    getGames(steamId)
        .then((gameList) => {
            showGameContainers()
            generateList(gameList)
            randomize(gameList)
        }).catch((err) => {
            console.log(err)
            outputRand.innerHTML = errorMessage
            outputList.innerHTML = errorMessage
        })

    getPlayerInfo(steamId)
        .then((player) => {
            const personaName = player.personaname
            playerName.innerHTML = personaName
        }).catch((err) => {
            console.log(err)
            outputRand.innerHTML = errorMessage
            outputList.innerHTML = errorMessage
        })
})

//Functions
async function getGames(steamId) {
    const api_url = `/games/${steamId}`
    const response = await fetch(api_url)
    const json = await response.json()
    let gameList

    //Filter out played games if the box is checked
    if (inputCheckbox.checked) {
        const unfiltered = json.response.games
        gameList = unfiltered.filter(game => !((game.playtime_forever / 60) > 1))
    } else {
        gameList = json.response.games
    }

    if (response.status !== 200) {
        throw new Error(errorMessage)
    }

    return gameList
}

async function getPlayerInfo(steamId) {
    const api_url = `/userinfo/${steamId}`
    const response = await fetch(api_url)
    const json = await response.json()

    const player = json.response.players[0]

    if (response.status !== 200) {
        throw new Error(errorMessage)
    }

    return player
}

function generateList(gameList) {
    //Clear listing before each subsequent generation.
    outputList.innerHTML = "";

    gameList.forEach(function (game) {
        var newLi = document.createElement('li')
        var playtime = Math.round(game.playtime_forever / 60)

        newLi.innerHTML = `
        <h4>${game.name}</h4>
        <span class="game-time">Playtime: ${playtime} hrs</span>
        `
        outputList.appendChild(newLi)
    });

    outputTotal.innerHTML = gameList.length
}

function randomize(gameList) {
    var rand = Math.floor(Math.random() * gameList.length)
    outputRand.innerHTML = gameList[rand].name

    buttonRand.addEventListener('click', () => {
        randomize(gameList)
    })
}

function showGameContainers() {
    loader.style.display = 'none'
    randContainer.style.display = 'block'
    allContainer.style.display = 'block'
}