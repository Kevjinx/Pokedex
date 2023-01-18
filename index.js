


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

const updateNextPrevBtn = async (data) => {
	const nextBtn = document.getElementById('next-pokemon-btn')
	const prevBtn = document.getElementById('previous-pokemon-btn')
	const nextPrevPokemon = await getPrevNextData(data.nationalNumber)
	console.log(nextPrevPokemon)

	nextBtn.value = data.nationalNumber + 1
	prevBtn.value = data.nationalNumber - 1

	nextBtn.innerText = `${nextPrevPokemon.next.name} #${nextPrevPokemon.next.id}`
	prevBtn.innerText = `${nextPrevPokemon.prev.name} #${nextPrevPokemon.prev.id}`

}

const fetchData = async (value) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${value}`
	console.log('fetching data from url: ', url);
	const response = await fetch(url)
	const data = await response.json()

	let result = {}
	result.id = data.id
	result.dataAbilities = data.abilities.map(ability => ability.ability.name);
	result.nationalNumber = getNationalNumber(data);
	result.types = data.types.map(type => type.type.name);
	result.height = data.height;
	result.weight = data.weight;
	result.stats = getStats(data);
	result.baseExp = data.base_experience;
	result.img = data.sprites.other['official-artwork'].front_default;
	result.name = data.forms[0].name;

	return result
}


const getData = async (search) => {
	try {
		console.log(search);
		let value;
		if (search === 'random') {
			//randomly select a pokemon index between 1-649
			//need to use a different way to get random pokemon to include all pokemon for all versions.
			value = Math.floor(Math.random() * 649) + 1;
			console.log(value);
		} else if (search === 'next') {
			value = document.getElementById('next-pokemon-btn').value
		} else if (search === 'previous') {
			value = document.getElementById('previous-pokemon-btn').value
		} else {
			value = document.getElementById('pokemon-search-input').value;
		}

		const result = await fetchData(value)
		return result

	} catch (error) {
		console.log(error)
	}
}

const getPrevNextData = async (value) => {
	try {
		const next = await fetchData(value+1)
		const prev = await fetchData(value-1)
		return {next, prev}
	} catch (error) {
		console.log(error)
	}
}

const updateText = (data) => {
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

	const pokemonNameUpper = data.name.charAt(0).toUpperCase() + data.name.slice(1)

	pokemonName.innerText = `${pokemonNameUpper} #${data.id}`
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

}


const updateData = async (event) => {
	event.preventDefault();
	let data;

	if (event.target.id === 'random-pokemon-btn') {
		console.log('clicked random button')
		data = await getData('random')
	} else if (event.target.id === 'next-pokemon-btn') {
		console.log('clicked next button')
		data = await getData('next')
	} else if (event.target.id === 'previous-pokemon-btn') {
		console.log('clicked previous button')
		data = await getData('previous')
	} else data = await getData();

	console.log(data);

	updateText(data)
	updateStats(data.stats)
	updateNextPrevBtn(data)
}


const randomPokemonBtn = document.getElementById('random-pokemon-btn');
randomPokemonBtn.addEventListener('click', updateData);

const nextPokemonBtn = document.getElementById('next-pokemon-btn');
const previousPokemonBtn = document.getElementById('previous-pokemon-btn');
nextPokemonBtn.addEventListener('click', updateData);
previousPokemonBtn.addEventListener('click', updateData);

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
