window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	// Timer
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

	countTimer('4 january 2021');

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

	// Slider
	const slider = () => {
		const slider = document.querySelector('.portfolio-content'),
				slide = document.querySelectorAll('.portfolio-item'),
				dots = document.querySelector('.portfolio-dots');

		slide.forEach(() => {
			const item = document.createElement('li');
			item.classList.add('dot');
			dots.appendChild(item);
		})
		//dots.children[0].classList.add('dot-active');

		const dot = document.querySelectorAll('.dot');
		dot[0].classList.add('dot-active')
		let currentSlide = 0,
			interval;

		//currentSlide.classList.add('dot-active');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
				if (currentSlide >= slide.length) {
					currentSlide = 0;
				}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();
			let target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			};

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			
			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			}else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			};

			if (currentSlide >= slide.length) {
				currentSlide= 0;
			}

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		})
		startSlide();
	};

	slider();

	// Our Team change img
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
	
	ourTeam();

	// Calculator
	const calcBlock = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
				calcType = document.querySelector('.calc-type'),
				calcSquare = document.querySelector('.calc-square'),
				calcDay = document.querySelector('.calc-day'),
				calcCount = document.querySelector('.calc-count'),
				totalValue = document.getElementById('total'),
				input = document.querySelectorAll('.calc-block input');
		
		input.forEach((event, index) => {
			input[index].addEventListener('input', () => {
				input[index].value = input[index].value.replace(/\D/g, '');
			})
		})

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
					squareValue = calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value <= 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			totalValue.textContent = total;
		}

		calcBlock.addEventListener('change', (event) => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		})
		
	}

	calcBlock(1000);

});