
const getData = () => {
	let result
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
			result = {dataAbilities, nationalNumber, types, height, weight, stats, baseExp}
		});
	return result
}
