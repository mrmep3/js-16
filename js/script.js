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
const cancel = document.querySelector('#cancel');
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
const dataInput = document.querySelectorAll('.data input[type=text]');
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

			this.budget = +salaryAmount.value;

			this.getExpenses();
			this.getIncome();
			this.getExpensesMonth();
			this.getIncomeMonth();
			this.getAddExpenses();
			this.getAddImcome();
			this.getBudget();
			//this.getTargetMonth();
			//this.getStatusIncome();
			
			this.showResult();
			this.blockInput();

			start.style.display = 'none';
			cancel.style.display = 'block';
	},
	blockInput: function (disabled = true) {
		dataInput.forEach(function (item) {
			item.disabled = disabled;
		})
	},
	cancel: function () {
		console.log('ты нажад сбросить');
		for (let i = incomeItems.length -1; i > 0; i--) {
			incomeItems[0].parentNode.removeChild(incomeItems[i]);
		};
		for (let i =expensesItems.length - 1; i > 0; i--) {
			expensesItems[0].parentNode.removeChild(expensesItems[i]);
		};
		incomeAdd.style.display = '';
		expensesAdd.style.display = '';
		this.blockInput(false);
		dataInput.forEach(function (item) {
			item.value = '';
		});
		this.getBudget();
		periodSelect.value = document.querySelector('.period-amount').textContent = 1;
		this.startDisable();
		start.style.display = 'block';
		cancel.style.display = 'none';
	},
	showResult: function () {
		console.log(this);
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = capitalize(this.addExpenses.join(', '));
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
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
	getExpensesMonth: function () { // функция возвращает сумму всех обязательных расходов
		this.expensesMonth = 0;
        for (let item in this.expenses) {
			this.expensesMonth += this.expenses[item];
		}
	},
	getIncomeMonth: function () {
		this.incomeMonth = 0;
		for (let item in appData.income) {
			this.incomeMonth += this.income[item];
		}
	},
	getBudget: function () { 
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},
	getTargetMonth: function () {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	},
	getStatusIncome: function () {
		console.log('Дневной бюджет: ', this.budgetDay);
		// Условия вывода переменной budgetDay
		if (this.budgetDay > 1200) {
			console.log('У вас высокий уровень дохода');
		} else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
			console.log('У вас средний уровень дохода');
		} else if (this.budgetDay < 600 && this.budgetDay >= 0) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		} else if (this.budgetDay < 0) {
			console.log('Что то пошло не так');
		}
	},
	getInfoDeposit: function () {
		if (this.deposit) {
			let y;
			do {
				y = prompt ('Какой годовой процент?', '10');
			} while (!isNumber(y));
			this.percentDeposit = +y;
			do {
				y = prompt ('Какой сумма заложена?', 10000);
			} while (!isNumber(y));
			this.moneyDeposit = +y;
		}
	},
	calcSavedMoney: function () {
		return this.budgetMonth * periodSelect.value;
	},
	changePeriodSelect: function (event) {
		document.querySelector('.period-amount').textContent = event.target.value;
		incomePeriodValue.value = appData.calcSavedMoney();
	},
	startDisable: function () {
		start.disabled = !isNumber(salaryAmount.value.trim());
		if (start.disabled) {
			start.style.cursor='not-allowed';
		} else {
			start.style.cursor='pointer';
		}
	}
};

const startBtn = appData.start.bind(appData);
const cancelBtn = appData.cancel.bind(appData);

appData.startDisable();
start.addEventListener('click', startBtn);
cancel.addEventListener('click', cancelBtn)
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.startDisable);
