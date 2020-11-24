'use strict';

const money = +prompt('Какой твой доход?', ''),
	income = 'Фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 100000,
	period = 6,
	expenses1 = prompt('Введите обязательную статью расходов?', ''),
	amount1 = +prompt('Во сколько это обойдется?', ''),
	expenses2 = prompt('Введите обязательную статью расходов?', ''),
	amount2 = +prompt('Во сколько это обойдется?', ''),
	budgetMonth = Math.ceil(money - (amount1 + amount2)),
	target = Math.ceil(mission / budgetMonth),
	budgetDay = Math.floor(money / 30);


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
console.log('Нижний регистр: ', addExpenses.toLowerCase().split(', '));

console.log('Месячный бюджет: ', budgetMonth);

console.log('Цель будет достигнута за ' + target + ' месяцев');

// Вывод переменной budgetDay
console.log('Дневной бюджет: ', budgetDay);

// Условия вывода переменной budgetDay
if (budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay <= 1200 && budgetDay >= 600) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
	console.log('Что то пошло не так');
}