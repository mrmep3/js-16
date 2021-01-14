const togglePopup = () => {
	const modalCallback = document.querySelector('.modal-callback'),
			modalOverlay = document.querySelector('.modal-overlay'),
			callbackBtn = document.querySelectorAll('.callback-btn'),
			servisesBtn = document.querySelectorAll('.absolute'),
			buttonServices = document.querySelector('.button-services');

	callbackBtn.forEach((element) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			modalCallback.style.display = 'block';
			modalOverlay.style.display = 'block';

		})
	})

	servisesBtn.forEach((element) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			modalCallback.style.display = 'block';
			modalOverlay.style.display = 'block';
		})
	})

	buttonServices.addEventListener('click', (event) => {
		event.preventDefault();
		modalCallback.style.display = 'block';
		modalOverlay.style.display = 'block';
	})

	modalCallback.addEventListener('click', (event) => {
		let target = event.target;
		if ( target.tagName === 'IMG' ) {
			modalCallback.style.display = 'none';
			modalOverlay.style.display = 'none';
		} 
	})

	modalOverlay.addEventListener('click', () => {
		modalCallback.style.display = 'none';
		modalOverlay.style.display = 'none';
	})
}

export default togglePopup;