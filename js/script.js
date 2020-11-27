'use strict';
//break;
//функция проверки на число
const isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n)
};

const start = function() {
	const number = Math.floor(Math.random() * 100) +1;
	console.log(number);

	function game() {
		const num = prompt('Угадай число от 1 до 100');

		if (num === null) {
			alert('Игра окончена');
			return;
		};
		if (isNumber(num)) {
			//console.log(num, typeof num);
			// преобразуем в число
			const realNum = +num;
			//console.log(realNum, typeof realNum);
			if (realNum > number) {
				alert('Загаданное число меньше');
				game();
			} else if (realNum < number) {
				alert('Загаданное число больше');
				game();
			} else {
				confirm('Поздравляю, Вы угадали!!!')
				return;
			}
		} else {
			alert('Введи число');
			game();
		}
	}
	//console.dir(game);
	game();
};

start();