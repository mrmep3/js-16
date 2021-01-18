const sliderCarousel = () => {
	const box = document.querySelector('.services-elements'),
			carousel = document.querySelector('.services-carousel'),
			slides = document.querySelector('.services-carousel').children,
			buttons = document.querySelector('.services-arrow').children;

	let position = 0, slideShow = 3, size = Math.floor(100 / slideShow) ;

	const addClass = () => {
		box.classList.add('services-slider');
		carousel.classList.add('services-slider__wrap');
		for (const item of slides) {
			item.classList.add('services-slider__item');
		}
	}

	addClass();

	const addStyle = () => {
		const style = document.createElement('style');
		style.id = 'services-slider__style';
		document.head.appendChild(style);
	}

	addStyle();

	const changeStyle = () => {
		document.getElementById('services-slider__style').textContent = `
			.services-slider {
				overflow: hidden !important;
			}
			.services-slider__wrap {
				display: flex !important;
				transition: translate 0.5s !important;
				will-change: transform !important;
			}
			.services-slider__item {
				flex: 0 0 ${size}% !important;
				margin: auto 0 !important;
			}
		`;
	}

	changeStyle();

	const toggleSlide = () => {
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', (event) => {
				if (event.target.matches('.arrow-right')) {
					++ position;
					if (position === (slides.length - slideShow) + 1) {
						position = 0;
					}
					carousel.style.transform = `translateX(-${position * size}%)`;
					console.log(position, size);
				} else if (event.target.matches('.arrow-left')) {
					-- position;
					if ( position < 0) {
						position = slides.length - slideShow;
					}
					carousel.style.transform = `translateX(-${position * size}%)`;
					console.log(position, size);
				}
			}
		)}
	}

	toggleSlide();

	const checkResponse = () => {
		if (box.clientWidth >= 992) {
			slideShow = 3;
			size = Math.floor(100 / slideShow);
			changeStyle();
		} else if (box.clientWidth > 769 && box.clientWidth < 992) {
			slideShow = 2;
			size = Math.floor(100 / slideShow);
			changeStyle();
		} else if (box.clientWidth <= 768) {
			slideShow = 1;
			size = Math.floor(100 / slideShow);
			changeStyle();
		} 
	}

	checkResponse();

	window.addEventListener('resize', checkResponse);
}

export default sliderCarousel;