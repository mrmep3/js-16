const ourTeam = () => {
	const team = document.querySelector('#command .row');
	let links = {};

	team.addEventListener('mouseover', (event) => {
		const target = event.target;
		if (target.classList.contains('command__photo')) {
			links[event.target.dataset.img] = event.target.src;
			event.target.src = event.target.dataset.img;
		}

	});
	team.addEventListener('mouseout', (event) => {
		const target = event.target;
		if (target.classList.contains('command__photo')) {
			event.target.src = links[event.target.dataset.img];
		}
	});
}

export default ourTeam;