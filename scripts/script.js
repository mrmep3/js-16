window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	// Timer
	function countTimer(deadline) {
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
				clearInterval(timeInterval);
				timerDays.textContent = '0';
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			} 
		}

		updateClock();
		let timeInterval = setInterval(updateClock, 1000);
	};

	countTimer('31 december 2020');

	// Menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItem = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
			// if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
			// 	menu.style.transform = `translate(0)`;
			// } else {
			// 	menu.style.transform = `translate(-100%)`;
			// }
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItem.forEach(elem => elem.addEventListener('click', handlerMenu));
	};

	toggleMenu();

	// Popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn'),
		popupClose = document.querySelector('.popup-close'),
		popupContent = document.querySelector('.popup-content'),
		popupData = {
			count: 0,
			speed: 15,
			start: 460,
			end: -50
		};

		const showPopup = () => {

			popupData.start > popupData.end ? popupData.count -= popupData.speed : popupData.count += popupData.speed;
			popupContent.style.transform = `translateX(${popupData.count}px)`;

			if (popupData.start > popupData.end ?
				popupData.count > popupData.end :
				popupData.count < popupData.end) {
				requestAnimationFrame(showPopup);
			}
		};	

		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				//requestAnimationFrame(showPopup);
				if (screen.width > 768) {
					popupData.count = popupData.start;
					requestAnimationFrame(showPopup);
				}
			})
		});

		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
			popupData.count = popupData.start;
		});
	}

	togglePopup();
});