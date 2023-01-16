

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

const getData = async () => {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon/bibarel')
		const data = await response.json()
		const dataAbilities = data.abilities.map(ability => ability.ability.name);
		const nationalNumber = getNationalNumber(data);
		const types = data.types.map(type => type.type.name);
		const height = data.height;
		const weight = data.weight;
		const stats = getStats(data);
		const baseExp = data.base_experience;
		const result = {dataAbilities, nationalNumber, types, height, weight, stats, baseExp}
		return result
	} catch (error) {
		console.log(error)
	}
}

const sendData = async (event) => {
	event.preventDefault();
	console.log('clicked search button');
	const nationalNumber = document.getElementById('national-number-data')
	const type = document.getElementById("type-data")
	const height = document.getElementById("height-data")
	const weight = document.getElementById("weight-data")
	const abilities = document.getElementById("abilities-data")
	const baseExp = document.getElementById("base-exp-data")
	const hp = document.getElementById("hp-data")
	const attack = document.getElementById("attack-data")
	const defense = document.getElementById("defense-data")
	const spAttack = document.getElementById("sp-attack-data")
	const spDefense = document.getElementById("sp-defense-data")
	const speed = document.getElementById("speed-data")

	const data = await getData();
	console.log(data);

	nationalNumber.innerText = data.nationalNumber
	type.innerText = data.types[0]
	height.innerText = data.height
	weight.innerText = data.weight
	abilities.innerText = data.dataAbilities[0]
	baseExp.innerText = data.stats.baseExp
	hp.innerText = data.stats.hp
	attack.innerText = data.stats.attack
	defense.innerText = data.stats.defense
	spAttack.innerText = data.stats.spAttack
	spDefense.innerText = data.stats.spDefense
	speed.innerText = data.stats.speed

}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', sendData);
