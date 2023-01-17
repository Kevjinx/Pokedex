const getNationalNumber = data => {
	for (let i = 0; i < data.game_indices.length; i++) {
		//using newer version to include all pokemon
		if (data.game_indices[i].version.name === 'white') {
			return data.game_indices[i].game_index
		}
	}
}

//should refactor this
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

const updateStats = (stats) => {
	const hpBar = document.getElementById('hp-bar')
	const attackBar = document.getElementById('attack-bar')
	const defenseBar = document.getElementById('defense-bar')
	const spAttackBar = document.getElementById('sp-attack-bar')
	const spDefenseBar = document.getElementById('sp-defense-bar')
	hpBar.style.width = `${stats.hp}%`
	attackBar.style.width = `${stats.attack}%`
	defenseBar.style.width = `${stats.defense}%`
	spAttackBar.style.width = `${stats.spAttack}%`
	spDefenseBar.style.width = `${stats.spDefense}%`
}


const getData = async (ranBtn) => {
	try {
		console.log(ranBtn);
		let value;
		if (ranBtn === true) {
			//randomly select a pokemon index between 1-1008
			value = Math.floor(Math.random() * 1008) + 1;
		} else {
			value = document.getElementById('pokemon-search-input').value;
		}

		const url = `https://pokeapi.co/api/v2/pokemon/${value}`
		console.log(url);
		const response = await fetch(url)
		const data = await response.json()

		const dataAbilities = data.abilities.map(ability => ability.ability.name);
		const nationalNumber = getNationalNumber(data);
		const types = data.types.map(type => type.type.name);
		const height = data.height;
		const weight = data.weight;
		const stats = getStats(data);
		const baseExp = data.base_experience;
		const img = data.sprites.other['official-artwork'].front_default;
		const name = data.forms[0].name;

		const result = {name, img, dataAbilities, nationalNumber, types, height, weight, stats, baseExp}
		return result

	} catch (error) {
		console.log(error)
	}
}

const updateData = async (event) => {
	event.preventDefault();
	const type = document.getElementById("type-data")
	const height = document.getElementById("height-data")
	const weight = document.getElementById("weight-data")
	const abilities = document.getElementById("abilities-data")
	const hp = document.getElementById("hp-data")
	const attack = document.getElementById("attack-data")
	const defense = document.getElementById("defense-data")
	const spAttack = document.getElementById("sp-attack-data")
	const spDefense = document.getElementById("sp-defense-data")
	const speed = document.getElementById("speed-data")
	const img = document.getElementById('image')
	const pokemonName = document.getElementById('pokemon-name')

	let data;
	if (event.target.id === 'random-pokemon-btn') {
		console.log('clicked random button')
		data = await getData(true)
	} else data = await getData();


	const pokemonNameUpper = data.name.charAt(0).toUpperCase() + data.name.slice(1)

	//!
	pokemonName.innerText = `${pokemonNameUpper} #${data.nationalNumber.toString()}`
	type.innerText = data.types.toString()
	height.innerText = data.height
	weight.innerText = data.weight
	abilities.innerText = data.dataAbilities.toString()
	hp.innerText = data.stats.hp
	attack.innerText = data.stats.attack
	defense.innerText = data.stats.defense
	spAttack.innerText = data.stats.spAttack
	spDefense.innerText = data.stats.spDefense
	speed.innerText = data.stats.speed
	img.src = data.img

	updateStats(data.stats)
}







const randomPokemonBtn = document.getElementById('random-pokemon-btn');
randomPokemonBtn.addEventListener('click', updateData);

const searchInput = document.getElementById('pokemon-search-input');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', updateData);
searchInput.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault()
		searchBtn.click()
	}
})

window.onload = event => {
	console.log(event)
	randomPokemonBtn.click()
}