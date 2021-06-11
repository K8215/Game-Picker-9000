//Selectors
const inputId = document.querySelector('#inputId');
const buttonSubmit = document.querySelector('#buttonSubmit');
const randContainer = document.querySelector('#randContainer');
const outputRand = document.querySelector('#outputRand');
const buttonRand = document.querySelector('#buttonRand');
const allcontainer = document.querySelector('#allContainer');
const outputTotal = document.querySelector('#outputTotal');
const outputList = document.querySelector('#outputList');
const loader = document.querySelector('#loader');
const errorMessage = 'Could not retrieve games.';

//Init
buttonSubmit.addEventListener('click', function (e) {
    e.preventDefault();

    //Grab user's input
    let steamId = inputId.value;

    //Show loader
    loader.style.display = 'block';

    //Display games
    getGames(steamId)
        .then((gameList) => {
            loadGames();
            generateList(gameList);
            randomize(gameList);
        })
        .catch((err) => {
            console.log(err);
            outputRand.innerHTML = errorMessage;
            outputList.innerHTML = errorMessage;
        });
});

//Functions
async function getGames(steamId) {
    const api_url = `/games/${steamId}`;
    const response = await fetch(api_url);
    const json = await response.json();
    const gameList = json.response.games;

    if (response.status !== 200) {
        throw new Error(errorMessage);
    }

    return gameList;
};

function generateList(gameList) {
    gameList.forEach(function (game) {
        var newLi = document.createElement('li');
        var name = document.createTextNode(`${game.name}`)

        newLi.appendChild(name);
        outputList.appendChild(newLi)
    });

    outputTotal.innerHTML = gameList.length;
}

function randomize(gameList) {
    var rand = Math.floor(Math.random() * gameList.length);
    outputRand.innerHTML = gameList[rand].name;

    buttonRand.addEventListener('click', () => {
        randomize(gameList);
    });
}

function loadGames() {
    loader.style.display = 'none';
    randContainer.style.display = 'block';
    allContainer.style.display = 'block';
}