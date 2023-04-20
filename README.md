# Game Picker 9000

Game Picker 9000 is a web application built using Node.js that retrieves a list of games from a Steam user's library and randomly selects one for the user to play.

See it here: http://game-picker-9000-app.glitch.me/

## Getting Started

To use Game Picker 9000, you must have Node.js and NPM installed on your machine. Then, you can clone the repository and run the following commands:

```Javascript
npm install
npm start
```

This will install all necessary dependencies and start the application on port 3000.

API KEY INSTRUCTIONS:
This application accesses the Steam Web API. You must obtain a unique API key from Steam in order to host the application yourself. 

1. Visit https://steamcommunity.com/dev/apikey and log in to recieve a key.
2. Create a .env file in the root of the project.
3. Paste the following into the .env file: API_KEY=[api key here] 
4. Replace the brackets and their contents with your key. See provided .env_sample file for reference.
5. Give it a whirl.

## Usage

To use Game Picker 9000, enter a Steam ID number from a public profile to retrieve the list of games from. Once you have entered a valid Steam ID and clicked the "Submit" button, the application will print the library associated with that account and randomly select a game for you to play. Check the filter box to exclude games that have already been played.



