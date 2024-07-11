#### Pokemon game app

##### Installation
- Fork this repo and clone it locally:
  ``` sh
  git clone https://github.com/<your-username>/aletheia
  cd aletheia
  ```

- Access Folder

``` sh
cd frontend
```

- Install packages:

``` sh
npm install
```

- To run in dev mode

``` sh
npm run dev
```

- Access http://localhost:3000 in your browser.

##### Overview
The pokemon game app is a game that emulates the original pokemon game.

How to play:
- Access http://localhost:3000/ and costumize the map you want to play
- Submit the costumization, and a map preview will be shown.
- Click in the button "Start the game" below the custom map
- You can use the keyboard settings to move your character.
- Move in the grass to search for pokemons.
- next to the map, it has the "logs" and "my pokemons" sections.
- "logs" section show all the log messages of your current game
- "my pokemons" section shows your captured pokemons

#### Features
- [x] Map generation
- [x] Characters can't move in the sea
- [x] Character moviment
- [x] Grass interaction
- [x] Map Visualization
- [x] Log section
- [x] Pokemon list section
- [x] Fetchs pokemon from https://pokeapi.co/ API
- [] Save game progression in a json object
- [] Import game progression from a json object
- [] Game begins with character centralized in the map


##### TODOs and Improvements
- [] Save game progression in a json object
- [] Import game progression from a json object
- [] Game begins with character centralized in the map
- [] Add loading feedback while getting the game configuration
- [] Create a header component to navigate between pages
- [] Improve pokemon alert user interface
- [] Utilize typescript to enhance the code
