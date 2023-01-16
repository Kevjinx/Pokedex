import getData from "./getData";



const sendData = () => {
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

	const data = getData();
	nationalNumber.innerText = data.nationalNumber
	type.innerText = data.type
	height.innerText = data.height
	weight.innerText = data.weight
	abilities.innerText = data.abilities
	baseExp.innerText = data.baseExp
	hp.innerText = data.hp
	attack.innerText = data.attack
	defense.innerText = data.defense
	spAttack.innerText = data.spAttack
	spDefense.innerText = data.spDefense
	speed.innerText = data.speed

}

const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', sendData);
