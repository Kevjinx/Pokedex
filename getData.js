import fs from 'fs';
import fetch from 'node-fetch';



const getNationalNumber = data => {
	let result
	data.game_indices.findIndex(index => {
		//specifying version because game_index may not be the same for all version
		if (index.version.name === 'red') {
			result = index.game_index
		}
	})
	return result
}

fetch('https://pokeapi.co/api/v2/pokemon/ditto')
	.then(res => res.json())
	.then(data => {
		const dataAbilities = data.abilities.map(ability => ability.ability.name);
		const nationalNumber = getNationalNumber(data);

	}
);
