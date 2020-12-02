'use strict';
//break;
//функция проверки на число
const isNumber = function(n) {
	//console.log('n: ', n);
	return !isNaN(parseFloat(n)) && isFinite(n)
};

const isString = function(n) {
	// ^[а-яА-ЯёЁa-zA-Z0-9]+$
	let reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
	//console.log(reg.test(n));
	return reg.test(n);
};

const capitalize = (n, lower = false) =>
  (lower ? n.toLowerCase() : n).replace(/(?:^|,\s|["'([{])+\S/g, match => match.toUpperCase());
;

/* const capitalize = function(n) {
let splits = n.split(' ');
let result = ' ';

  for (let i = 0; i < splits.length; i++) {
    let str = splits[i];
    let first = str.substring(0, 1).toUpperCase();
    let leftovers = str.substring(1, str.length)
    result += first + leftovers + " ";
  }
  return result;
};
 */

let money;
const start = function () {
	do {
		money = prompt('Какой твой доход?', 50000);
	}
	while (!isNumber(money));
};

//start();


const appData = {
	income: {}, //дополнительный источник заработка
	addIncome: [],
	expenses: {}, // обязательные расходы
	addExpenses: [], // дополнительные расходы
	deposit: false, //депозит  в банке
	mission: 100000, // цель наколплений
	period: 6, // период для наколпений
	budget: +money, // доход за месяц
	budgetDay: 0,
	budgetMonth: 0, //доходы в месяц
	expensesMonth: 0, // расходы в месяц
	percentDeposit: 0, // процент на депозите
	moneyDeposit: 0, //сумма на депозите
	asking: function() {
		let itemIncome, cashIncome;
		if (confirm('У вас есть дополнительный источник заработка?')) {
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
			} while (!isString(itemIncome));
			do {
				cashIncome = prompt('Сколько вы на это зарабатываете в месяц?', 10000);
			} while (!isNumber(cashIncome));
			cashIncome = +cashIncome;
			appData.income[itemIncome] = cashIncome;
		}

		let itemExpenses = ' ';
		do {
			itemExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'комунальные расходы, такси, интернет');
		} while (!isString(itemExpenses));
		//appData.addExpenses =itemExpenses.toLowerCase().split(', ');
		appData.addExpenses = capitalize(itemExpenses);
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i++) {
			let str; 
			do {
				str = prompt('Введите обязательную статью расходов?');
			} while (!isString(str))
			appData.expenses[str] = one();
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
	},
	getInfoDeposit: function() {
		if (appData.deposit) {
			let y;
			do {
				y = prompt ('Какой годовой процент?', '10');
			} while (!isNumber(y));
			appData.percentDeposit = +y;
			do {
				y = prompt ('Какой сумма заложена?', 10000);
			} while (!isNumber(y));
			appData.moneyDeposit = +y;
		}
	},
	calcSavedMiney: function() {
		return appData.budgetMonth * appData.period;
	}
};

//appData.asking();
//appData.getExpensesMonth();
//appData.getBudget();
//appData.getTargetMonth();
//appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let item in appData) {
    console.log(item, appData[item]);
}

//appData.getInfoDeposit();
//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMiney());

console.log('Вывод данных 9го урока:');
const buttonStart = document.getElementById('start');
console.log('Кнопка "Расчитать": ', buttonStart);

const incomeAdd = document.getElementsByTagName('button')[0];
console.log('Кнопка "+" (доход): ', incomeAdd);

const expensesAdd = document.getElementsByTagName('button')[1];
console.log('Кнопка "+" (расход): ', expensesAdd);

const depositСheck = document.querySelector('#deposit-check');
console.log('Чекбокс (депозит): ', depositСheck);

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log('Поля ввода возможных доходов: ', additionalIncomeItem);

console.log('Поля правой части экрана');
//const budgetMonthValue = document.getElementsByClassName('result-total')[0];
//console.log('Доход за месяц: ', budgetMonthValue);
const budgetDayValue = document.getElementsByClassName('result-total')[1];
console.log('Дневной бюджет: ', budgetDayValue);
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
console.log('Расход за месяц: ', expensesMonthValue);
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
console.log('Возможные доходы: ', additionalIncomeValue);
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
console.log('Возможные расходы: ', additionalExpensesValue);
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
console.log('Накопления за период: ', incomePeriodValue);
const targetMonthValue = document.getElementsByClassName('result-total')[6];
console.log('Срок достижения цели: ', targetMonthValue);

const salaryAmount = document.querySelector('.salary-amount');
console.log('Поле ввода дохода: ', salaryAmount);

const incomeItems = document.querySelector('.income-items');
console.log('Наименование доп. дохода: ', incomeItems.children[0]);
console.log('Сумма доп. дохода: ', incomeItems.children[1]);

const expensesItems = document.querySelector('.expenses-items');
console.log('Наименование обяз. расхода: ', expensesItems.children[0]);
console.log('Сумма обяз. расхода: ', expensesItems.children[1]);

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('Возможные расходы: ', additionalExpensesItem);

const depositAmount = document.querySelector('.deposit-amount');
console.log('Сумма депозита: ', depositAmount);

const depositPercent = document.querySelector('.deposit-percent');
console.log('Процент депозита: ', depositPercent);

const targetAmount = document.querySelector('.target-amount');
console.log('Цель: ', targetAmount);

const periodSelect = document.querySelector('.period-select');
console.log('Период расчета: ', periodSelect);