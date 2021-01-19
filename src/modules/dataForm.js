export	const modalCallback = document.getElementById('callback'),
					modalOverlay = document.querySelector('.modal-overlay'),
					responseForm = document.getElementById('responseMessage'),
					callbackBtn = document.querySelectorAll('.callback-btn'),
					servisesBtn = document.querySelectorAll('.absolute'),
					buttonServices = document.querySelector('.button-services'),
					errorMessage = "Сообщение не отправлено",
					loadMessage = "Идет отправка ...",
					successMessage = "Спасибо! Мы скоро с Вами свяжемся!",
					form = document.getElementById('form1'),
					statusMessage = document.createElement('div');

export const clearForm = () => {
			for (let i = 0; i < form.length -1; i++) {
				form[i].value = '';
			}
		};