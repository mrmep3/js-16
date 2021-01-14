const toggleMenu = () => {
	const services = document.getElementById('services'),
			faq = document.getElementById('faq'),
			contacts = document.getElementById('contacts'),
			topMenu = document.querySelectorAll('.top-menu ul li'),
			up = document.querySelector('.up');

	topMenu.forEach((element, index) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			if ( index === 0 ) {
				services.scrollIntoView({block: "start", behavior: "smooth"});
			} else if ( index === 1 ) {
				faq.scrollIntoView({block: "start", behavior: "smooth"});
			} else if ( index === 2 ) {
				contacts.scrollIntoView({block: "start", behavior: "smooth"});
			}
		})
	})

	window.addEventListener('scroll', () => {
		up.hidden = (pageYOffset < document.documentElement.clientHeight / 2);
		up.addEventListener('click', () => {
			window.scrollTo({top: 0, left: 0, behavior: "smooth"});
		})
	})
}

export default toggleMenu;