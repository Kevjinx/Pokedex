import fs from 'fs';
import fetch from 'node-fetch';

fetch('https://pokeapi.co/api/v2/pokemon/bibarel')
  .then(response => response.json())
  .then(data => {
    fs.writeFileSync('bibarel.json', JSON.stringify(data));
    console.log('File saved successfully');
  })
  .catch(error => console.error(error));