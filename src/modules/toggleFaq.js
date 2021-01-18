const toggleFaq = () => {
	const accordeon = document.querySelector('.accordeon'),
			accordeonElement = document.querySelectorAll('.accordeon .element'),
			elementContent = document.querySelectorAll('.accordeon .element-content');

	const toggleFaq =(index) => {
		for( let i=0; i < elementContent.length; i++) {
			if ( index === i ) {
				accordeonElement[i].classList.add('active');
				elementContent[i].style.display = 'block';
			} else {
				accordeonElement[i].classList.remove('active');
				elementContent[i].style.display = 'none';
			}
		}
	}

	accordeon.addEventListener('click', (event) => {
		let target = event.target;
		if ( target.classList.contains('title') ) {
			accordeonElement.forEach((item, i) => {
				if ( item === target.closest('.element') ) {
					toggleFaq(i);
				}
			})
		}
	})

}

export default toggleFaq;