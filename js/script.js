'use strict';

const money = +prompt('Какой твой доход?', 50000),
	income = 'Фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Комуналка, такси, интернет'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 100000,
	period = 6,
	expenses1 = prompt('Введите обязательную статью расходов?', 'Курсы'),
	amount1 = +prompt('Во сколько это обойдется?', 5000),
	expenses2 = prompt('Введите обязательную статью расходов?', 'Питание'),
	amount2 = +prompt('Во сколько это обойдется?', 10000),
	result = getExpensesMonth(amount1, amount2),
	accumulatedMonth = getAccumulatedMonth(money, result),
	target = getTargetMonth(mission, accumulatedMonth),
	budgetDay = Math.floor(getAccumulatedMonth(money, result) / 30);

let showTypeOf = function(data) {
	console.log('Тип данных переменной: ', typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth(a, b) {
	return a + b;
};

function getAccumulatedMonth(a, b) {
	return a - b;
};

function getTargetMonth(a, b) {
	return a / b;
};

// Вывод строки в нижнем регистре
console.log('Нижний регистр: ', addExpenses.toLowerCase().split(', '));

//console.log('Месячный бюджет: ', budgetMonth);

console.log('Цель будет достигнута за ' + Math.ceil(target) + ' месяцев');

// Вывод переменной result
console.log('Расходы за месяц: ', result);

// Вывод переменной budgetDay
console.log('Дневной бюджет: ', budgetDay);

let getStatusIncome = function() {
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
};

getStatusIncome();