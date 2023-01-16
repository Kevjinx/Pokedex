import fs from 'fs';
import fetch from 'node-fetch';



const getNationalNumber = data => {
	for (let i = 0; i < data.game_indices.length; i++) {
		//using newer version to include all pokemon
		if (data.game_indices[i].version.name === 'black-2') {
			return data.game_indices[i].game_index
		}
	}
}

const getStats = data => {
	let result = {}
	data.stats.map(stat => {
		if (stat.stat.name === 'hp') {
			result.hp = stat.base_stat
		} else if (stat.stat.name === 'attack') {
			result.attack = stat.base_stat
		} else if (stat.stat.name === 'defense') {
			result.defense = stat.base_stat
		} else if (stat.stat.name === 'special-attack') {
			result.spAttack = stat.base_stat
		} else if (stat.stat.name === 'special-defense') {
			result.spDefense = stat.base_stat
		} else if (stat.stat.name === 'speed') {
			result.speed = stat.base_stat
		}
	})
	return result
}

const getData = () => {
	fetch('https://pokeapi.co/api/v2/pokemon/bibarel')
		.then(res => res.json())
		.then(data => {
			const dataAbilities = data.abilities.map(ability => ability.ability.name);
			const nationalNumber = getNationalNumber(data);
			const types = data.types.map(type => type.type.name);
			const height = data.height;
			const weight = data.weight;
			const stats = getStats(data);
			const baseExp = data.base_experience;
			console.log(dataAbilities, nationalNumber, types, height, weight, stats, baseExp);
		});
}

export default getData;