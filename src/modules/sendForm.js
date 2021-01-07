const sendForm = () => {
	const errorMessage = "Что-то пошло не так...",
			loadMessage = "Загрузка...",
			successMessage = "Спасибо! Мы скоро с Вами свяжемся!";

		const postData = (body) => {
			return fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'},
				body: JSON.stringify(body)
			})
		}

		const clearForm = (idForm) => {
			const form = document.getElementById(idForm);
			for (let i = 0; i < form.length -1; i++) {
				form[i].value = '';
			}
		}

		const getForm = (idForm) => {
			const form = document.getElementById(idForm),
					statusMessage = document.createElement('div');

			statusMessage.style.cssText = 'font-size: 2rem; color: white;';

			form.addEventListener('submit', (event) => {
				event.preventDefault();
				form.appendChild(statusMessage);
				statusMessage.textContent = loadMessage;
				const formData = new FormData(form);
				let body = {};
				formData.forEach((value, key) => {
					body[key] = value;
				})
				postData(body)
					.then((response) => {
						if (response.status !== 200) {
							throw new Error ('status network not 200');
						}
						let time = setInterval(() =>statusMessage.textContent = successMessage, 0);
						clearForm(idForm);
						setTimeout(() =>{ clearInterval(time); statusMessage.textContent = ''; 
							document.querySelector('.popup').style.display = 'none';}, 5000)
					})
					.catch(error => {statusMessage.textContent = errorMessage; console.error(error);});
				})
			form.addEventListener('input', (event) => {
				const target = event.target;
				if (target.matches('.form-phone')) {
					target.setAttribute('maxlength', 11);
					target.setAttribute('pattern', '[8]{1}[0-9]{10}');
					target.value = target.value.replace(/[^+\d]/g, '');
					if (/\+/.test(target.value)) {
						target.setAttribute('maxlength', 12);
						target.setAttribute('pattern', '[+]{1}[0-9]{11}');
					}
				}
				if (target.name === 'user_name') {
					target.setAttribute('pattern', '[А-Яа-яЁё]{2,}$');
					target.value = target.value.replace(/[^а-яё\s]/ig, '');
				}
				if (target.matches('.form-email')) {
					target.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
					target.value = target.value.replace(/[^a-z0-9@.]/ig, '');
				}
				if (target.matches('.mess')) {
					target.value = target.value.replace(/[^а-яё0-9!?,.;:-\s]/ig, '');
				}
			});
		}
	getForm('form1');
	getForm('form2');
	getForm('form3');
};

export default sendForm;