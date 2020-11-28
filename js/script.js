'use strict';
//break;
//функция проверки на число
const isNumber = function(n) {
	console.log('n: ', n);
	return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

const start = function () {
	do {
		money = prompt('Какой твой доход?', 50000);
	}
	while (!isNumber(money));
}

start();


const appData = {
	income: {},
	addIncome: [],
	expenses: {}, // обязательные расходы
	addExpenses: [], // дополнительные расходы
	deposit: false, //депозит  в банке
	mission: 100000, // цель наколплений
	period: 6, // период для наколпений
	budget: +money, // доход за месяц
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Комуналка, такси, интернет');
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			appData.expenses[prompt('Введите обязательную статью расходов?')] = one();
			function one() {
				let y;
				do {
					y = prompt('Во сколько это обойдется?');
				} while (!isNumber(y));
				return +y;
			}
		}
		console.log(appData.expenses);
	},
	getExpensesMonth: function() { // функция возвращает сумму всех обязательных расходов
		appData.expensesMonth = 0;
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item];
		}
		console.log('Расходы за месяц: ', appData.expensesMonth);
	},
	getBudget: function() { // Доход минус сумма обазательных расходов
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function() {
		let result = Math.ceil(appData.mission / appData.budgetMonth);
		
		if ( result > 0 ) {
			console.log('Цель будет достигнута за ' + result + ' месяц(а,ев)');
		} else {
			console.log('Цель не будет достигнута');
		}
	},
	getStatusIncome: function() {
		console.log('Дневной бюджет: ', appData.budgetDay);
		// Условия вывода переменной budgetDay
		if (appData.budgetDay > 1200) {
			console.log('У вас высокий уровень дохода');
		} else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) {
			console.log('У вас средний уровень дохода');
		} else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		} else if (appData.budgetDay < 0) {
			console.log('Что то пошло не так');
		}
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let item in appData) {
    console.log(item, appData[item]);
}