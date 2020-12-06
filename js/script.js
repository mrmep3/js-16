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

const start = document.querySelector('#start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositСheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('result-total')[0];
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
const salaryAmount = document.querySelector('.salary-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const appData = {
	income: {}, //дополнительный источник заработка
	incomeMonth: 0,
	addIncome: [],
	expenses: {}, // обязательные расходы
	addExpenses: [], // дополнительные расходы
	deposit: false, //депозит  в банке
	period: 6, // период для наколпений
	budget: 0, // доход за месяц
	budgetDay: 0,
	budgetMonth: 0, //доходы в месяц
	expensesMonth: 0, // расходы в месяц
	percentDeposit: 0, // процент на депозите
	moneyDeposit: 0, //сумма на депозите
	start: function () {

/* 			if ( salaryAmount.value === '' ) {
				alert('Поле "Месячный доход" должно быть заполнено!');
				return;
			} else if ( !isNumber(salaryAmount.value) ) {
				alert('В поле "Месячный доход" разрешены только цифры!');
				return;
			} */

			appData.budget = +salaryAmount.value;

			appData.getExpenses();
			appData.getIncome();
			appData.getExpensesMonth();
			appData.getIncomeMonth();
			appData.getAddExpenses();
			appData.getAddImcome();
			appData.getBudget();
			//appData.getTargetMonth();
			//appData.getStatusIncome();
			
			appData.showResult();
	},
	showResult: function () {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = capitalize(appData.addExpenses.join(', '));
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcSavedMoney();
	},
	addExpensesBlock: function () { // добавляем новые блоки обязательных расходов
		//let expensesItem = expensesItems;
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		//parentNode получает родителя
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesAdd.style.display = "none";
		}
	},
	addIncomeBlock: function () {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomeAdd.style.display = "none";
		}
	},
	getExpenses: function () { 
		expensesItems.forEach(function (item) {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if ( itemExpenses !== '' && cashExpenses !== '' ) {
				appData.expenses[itemExpenses] = +cashExpenses;
			}
		})
	},
	getIncome: function () {
		incomeItems.forEach(function (item) {
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if ( itemIncome !== '' && cashIncome !== '' ) {
			//} if (!isString(itemIncome) && !isNumber(cashIncome)) {
				appData.income[itemIncome] = +cashIncome;
			}
		})
	},
	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				appData.addExpenses.push(item);
			}
		})
	},
	getAddImcome: function () {
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		})
	},
	asking: function () {
/* 		let itemIncome, cashIncome;
		if (confirm('У вас есть дополнительный источник заработка?')) {
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
			} while (!isString(itemIncome));
			do {
				cashIncome = prompt('Сколько вы на это зарабатываете в месяц?', 10000);
			} while (!isNumber(cashIncome));
			cashIncome = +cashIncome;
			appData.income[itemIncome] = cashIncome;
		} */

/* 		let itemExpenses = ' ';
		do {
			itemExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'комунальные расходы, такси, интернет');
		} while (!isString(itemExpenses)); */
		//appData.addExpenses =itemExpenses.toLowerCase().split(', ');
		appData.addExpenses = capitalize(itemExpenses);
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
/* 		for (let i = 0; i < 2; i++) {
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
		console.log(appData.expenses); */
	},
	getExpensesMonth: function () { // функция возвращает сумму всех обязательных расходов
		appData.expensesMonth = 0;
        for (let item in appData.expenses) {
            appData.expensesMonth += appData.expenses[item];
		}
	},
	getIncomeMonth: function () {
		appData.incomeMonth = 0;
		for (let item in appData.income) {
			appData.incomeMonth += appData.income[item];
		}
	},
	getBudget: function () { 
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function () {
		return Math.ceil(targetAmount.value / appData.budgetMonth);
/* 		let result = Math.ceil(targetAmount.value / appData.budgetMonth);
		
		if ( result > 0 ) {
			console.log('Цель будет достигнута за ' + result + ' месяц(а,ев)');
		} else {
			console.log('Цель не будет достигнута');
		} */
	},
	getStatusIncome: function () {
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
	getInfoDeposit: function () {
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
	calcSavedMoney: function () {
		return appData.budgetMonth * periodSelect.value;
	},
	changePeriodSelect: function (event) {
		document.querySelector('.period-amount').textContent = event.target.value;
		incomePeriodValue.value = appData.calcSavedMoney();
	},
	startDisable: function () {
		start.disabled = !isNumber(salaryAmount.value.trim());
		start.style.cursor='not-allowed';
	}
};

appData.startDisable();
start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.startDisable);
