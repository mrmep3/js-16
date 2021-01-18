const slider = () => {
	const topSlider = document.querySelector('.top-slider'),
			itemSlider = document.querySelectorAll('.top-slider .item'),
			itemDots = document.querySelector('.slick-dots');
	let currentSlide = 0, interval;

	itemSlider.forEach(() => {
		const item = document.createElement('li');
		itemDots.appendChild(item);
	})

	const li = document.querySelectorAll('.slick-dots li')
	li[0].classList.add('slick-active')

	const prevSlide = (item, index, strClass) => {
		item[index].classList.remove(strClass);
	};

	const nextSlide = (item, index, strClass) => {
		item[index].classList.add(strClass);
	};

	const autoPlay = () => {
		prevSlide(itemSlider, currentSlide, 'active');
		prevSlide(li, currentSlide, 'slick-active');
		currentSlide++;
		if ( currentSlide >= itemSlider.length ) {
			currentSlide = 0;
		};
		nextSlide(itemSlider, currentSlide, 'active');
		nextSlide(li, currentSlide, 'slick-active');
	}

	const startSlider = (time = 3000) => {
		interval = setInterval(autoPlay, time);
	}

	const stopSlider = () => {
		clearInterval(interval);
	}

	topSlider.addEventListener('click', (event) => {
		if (!event.target.matches('.slick-dots li')) {
			return;
		};
		prevSlide(itemSlider, currentSlide, 'active');
		prevSlide(li, currentSlide, 'slick-active');
		if ( event.target.matches('.slick-dots li') ) {
			li.forEach((elem, index) => {
				if (elem === event.target) {
					currentSlide = index;
				}
			});
		};
		nextSlide(itemSlider, currentSlide, 'active');
		nextSlide(li, currentSlide, 'slick-active');
	})

	topSlider.addEventListener('mouseover', (event) => {
		if ( event.target.matches('.slick-dots li') ) {
			stopSlider();
		}
	});

	topSlider.addEventListener('mouseout', (event) => {
		if ( event.target.matches('.slick-dots li') ) {
			startSlider();
		}
	});

	startSlider();
}

export default slider;