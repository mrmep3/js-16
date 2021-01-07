const countTimer = (deadline) => {
	const	timerHours = document.querySelector('#timer-hours'),
		timerDays = document.querySelector('#timer-days'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds');

	function getTimeRemaining() {
		let dateStop = new Date(deadline). getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeRemaining % 60),
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor((timeRemaining / 60 / 60) % 24),
			day = Math.floor(timeRemaining / 60 / 60 / 24);
			return {timeRemaining, day, hours, minutes, seconds};
	}

	function updateClock() {
		let timer = getTimeRemaining();

		timerDays.textContent = timer.day;
		timerHours.textContent = ('0' + timer.hours).slice(-2);
		timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
		timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

		if (timer.timeRemaining <= 0) {
			//clearInterval(timeInterval);
			timerDays.textContent = '0';
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
		} 
	}

	updateClock();
	let timeInterval = setInterval(updateClock, 1000);

};

export default countTimer;