import { modalCallback, modalOverlay, statusMessage, errorMessage, successMessage, loadMessage, form, clearForm } from './dataForm';

const sendForm = () => {

	const postData = (body) => {
		return fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'},
				body: JSON.stringify(body)
		})
	}

/* 	const clearForm = () => {
		for (let i = 0; i < form.length -1; i++) {
			form[i].value = '';
		}
	} */
	
	statusMessage.style.cssText = 'font-size: 2rem; color: black; text-align: center; padding-top: 10px;';

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		form.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		//clearForm();
			const formData = new FormData(form);
			let body = {};

			formData.forEach((value, key) => {
				body[key] = value;
			})
			console.log(statusMessage);
			postData(body)
				.then((response) => {
					//statusMessage.textContent = loadMessage;
					if (response.status !== 200) {
						throw new Error ('status network not 200');
					} else if (response.status === 200) {
						let time = setInterval(() =>statusMessage.textContent = successMessage, 0);
						clearForm();
						setTimeout(() =>{ clearInterval(time); statusMessage.textContent = ''; 
							modalCallback.style.display = 'none'; modalOverlay.style.display = 'none';}, 5000)
					}
				})
				.catch(error => {statusMessage.textContent = errorMessage; console.error(error);});
	})

	form.addEventListener('input', (event) => {
		const target = event.target;
		if (target.name === 'tel') {
			target.setAttribute('maxlength', 11);
			target.setAttribute('pattern', '[8]{1}[0-9]{10}');
			target.value = target.value.replace(/[^+\d]/g, '');
			if (/\+/.test(target.value)) {
				target.setAttribute('maxlength', 12);
				target.setAttribute('pattern', '[+]{1}[0-9]{11}');
			}
		}
		if (target.name === 'fio') {
			target.setAttribute('pattern', '[А-Яа-яЁё]{2,}$');
			target.value = target.value.replace(/[^а-яё]/ig, '');
		}
	});
}

export default sendForm;