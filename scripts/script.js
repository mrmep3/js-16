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

	countTimer('1 january 2021');

	// Menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = (event) => {
			const target = event.target;
		
			if (target === document.querySelector('.close-btn') || target.closest('ul>li') || target.closest('.menu')) {
				menu.classList.toggle('active-menu');
			} 
		};

		menu.addEventListener('click', handlerMenu)
		btnMenu.addEventListener('click', handlerMenu);
	};

	toggleMenu();

	// Popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn'),
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

		popup.addEventListener('click', (event) => {
			let target = event.target;
			if ( target.classList.contains('popup-close') ) {
				popup.style.display = 'none';
				popupData.count = popupData.start;
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}
		})
	};

	togglePopup();

	// Tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
				tab = tabHeader.querySelectorAll('.service-header-tab'),
				tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = (index) => {
			for(let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		}
		
		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
				target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				})
			}
		})
	};

	tabs();
});