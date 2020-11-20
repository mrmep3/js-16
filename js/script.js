const money = 45000,
		 income = 'Фриланс',
		 addExpenses = 'Комуналка, интернет, бензин',
		 deposit = true,
		 mission = 150000,
		 period = 6;

let budgetDay = money / 30;

	// Вывод типа данных
console.log('Тип данных переменной "money": ', typeof money);
console.log('Тип данных переменной "income": ', typeof income);
console.log('Тип данных переменной "deposit": ', typeof deposit);

	//Вывод длины строки
console.log('Длинная строки переменной "addExpenses": ', addExpenses.length);

	//Вывод периода и цели
console.log('Период равен ' + period + ' ' + 'месяцев');
console.log('Цель заработать ' + mission + ' рублей');

	// Вывод строки в нижнем регистре
console.log('Нижний регистр: ', addExpenses.toLowerCase());
console.log('Массив: ', addExpenses.split(', '));

	// Вывод переменной budgetDay
console.log('Дневной бюджет: ', budgetDay);