'use strict';
//break;
//функция проверки на число
const isNumber = function(n) {
	console.log('n: ', n);
	return !isNaN(parseFloat(n)) && isFinite(n)
};

const 
	income = 'Фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Комуналка, такси, интернет'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	mission = 100000,
	period = 6;

let money;

const start = function () {
	do {
		money = prompt('Какой твой доход?');
	}
	while (!isNumber(money));
}

start();

const showTypeOf = function(data) {
	console.log('Тип данных переменной: ', typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1, expenses2;

//let getExpensesMonth = function() {
function getExpensesMonth() {
	let sum = 0;

	for (let i = 0; i < 2; i++) {

		if (i === 0) {
			expenses1 = prompt('Введите обязательную статью расходов?', 'Курсы');
		} else if (i === 1) {
			expenses2 = prompt('Введите обязательную статью расходов?', 'Питание');
		};
		// проверяем на число переменную sum
		let y;
			
			do {
				y = prompt('Во сколько это обойдется?');
			} while (!isNumber(y));
			y = +y;
		
		sum += y;

	}

	return sum;
};

const expensesAmount = getExpensesMonth( );

function getAccumulatedMonth() {
	return money - expensesAmount;
};

function getTargetMonth() {
	let result = Math.ceil(mission / getAccumulatedMonth());
	
	if ( result > 0 ) {
		console.log('Цель будет достигнута за ' + result + ' месяцев');
	} else {
		console.log('Цель не будет достигнута');
	}
	//return mission / getAccumulatedMonth();
};

// Вывод строки в нижнем регистре
console.log('Нижний регистр: ', addExpenses.toLowerCase().split(', '));

// Вывод информации по достижении цели
getTargetMonth();

// Вывод расходов за месяц
console.log('Расходы за месяц: ', expensesAmount);

const budgetDay = Math.floor(getAccumulatedMonth() / 30);

// Вывод переменной budgetDay
console.log('Дневной бюджет: ', budgetDay);

const getStatusIncome = function() {
	// Условия вывода переменной budgetDay
	if (budgetDay > 1200) {
		console.log('У вас высокий уровень дохода');
	} else if (budgetDay <= 1200 && budgetDay >= 600) {
		console.log('У вас средний уровень дохода');
	} else if (budgetDay < 600 && budgetDay >= 0) {
		console.log('К сожалению у вас уровень дохода ниже среднего');
	} else if (budgetDay < 0) {
		console.log('Что то пошло не так');
	}
};

getStatusIncome();