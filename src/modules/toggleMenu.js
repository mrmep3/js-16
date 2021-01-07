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

export default toggleMenu;