import { modalCallback, modalOverlay, callbackBtn, servisesBtn, buttonServices, clearForm } from './dataForm';

const togglePopup = () => {

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
			clearForm();
		} 
	})

	modalOverlay.addEventListener('click', () => {
		modalCallback.style.display = 'none';
		modalOverlay.style.display = 'none';
		clearForm();
	})
}

export default togglePopup;