# Naluri Space Project

Welcome to the Naluri Space Project's Planet Solar System Modal application. This is a preliminary approach to providing useful data and visual aid for you to view the planets in our solar system.

## Features List

 - Pi value calculation in real-time intervals
 - Solar system planets selection
 - Visual references to planets
 - Planet data (Circumference, Area, Surface Area, Volume)
 - Pi value fetching

## Installation

1. Clone the project / Unzip to directory
2. Open Command Prompt/Terminal and navigate to folder 'nsp-node-server'
3. Run 'npm install'
4. Navigate to folder 'nsp-client'
5. Run 'npm install'

## Usage

1. Open two instances of Command Prompt/Terminal
2. First instance navigate to folder 'nsp-node-server'
3. Second instance navigate to folder 'nsp-client'
4. In each instance, run 'npm start'
5. The node server will run and listen onto port 3001 (Feel free to change in case of clashes)
6. The client will launch in a browser at 'http://localhost:3000/'

## Selecting Planet

1. Select a planet using the dropdown menu 
or
2. Swipe to a target planet using the slider 
or
4. Use the arrow keys to select a target planet
5. Relevant and useful data will be calculated and shown once a planet is selected

## Updating Pi Value

1. Pi value will be updated upon a planet's selection
2. Pi value may also be manually updated by clicking the 'Update Pi Value' button

## Changing Port Number

1. Navigate to 'nsp-node-server/server/index.js
2. edit the port number in 'const  PORT = process.env.PORT || 3001' to whichever is available in your network

### Future update plans

1. UI/UX overhaul (paying attention to Layout, structure and color tones)
2. Web and Mobile usability and responsiveness improvements
3. Three.js implementation for 3D experience
4. Database integration to incorporate more planets, galaxies and constellations