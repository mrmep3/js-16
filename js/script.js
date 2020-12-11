'use strict';
//break;
//функция проверки на число
const isNumber = function(n) {
	//console.log('n: ', n);
	return !isNaN(parseFloat(n)) && isFinite(n)
};

/* const isString = function(n) {
	// ^[а-яА-ЯёЁa-zA-Z0-9]+$
	let reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
	//console.log(reg.test(n));
	return reg.test(n);
}; */

/* const capitalize = (n, lower = false) =>
  (lower ? n.toLowerCase() : n).replace(/(?:^|,\s|["'([{])+\S/g, match => match.toUpperCase());
; */

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
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const AppData = function () {
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];
	this.deposit = false;
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
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
};

AppData.prototype.blockInput = function (disabled = true) {
	const dataInput = document.querySelectorAll('.data input[type=text]');
	dataInput.forEach(function (item) {
		item.disabled = disabled;
	});
};

AppData.prototype.cancel = function () {
	incomeItems.forEach(function (item, i) {
		if ( i > 0 && i < 3 ) {
			item.remove()
		}
	})
	expensesItems.forEach(function (item, i) {
		if ( i > 0 && i < 3 ) {
			item.remove()
		}
	})
	incomeAdd.style.display = '';
	expensesAdd.style.display = '';
	this.blockInput(false);
	document.querySelectorAll('.data input[type=text]').forEach(function (item) {
		item.value = '';
	});
	document.querySelectorAll('.result input[type=text]').forEach(function (item) {
		item.value = '';
	});
	this.reset(),
	//this.getBudget();
	periodSelect.value = document.querySelector('.period-amount').textContent = 1;
	this.startDisable();
	start.style.display = 'block';
	cancel.style.display = 'none';
};

AppData.prototype.reset = function () {
	this.income = {};
	this.expenses = {};
	this.expensesMonth = 0;
	this.incomeMonth = 0;
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.addIncome = [];
	this.addExpenses = [];
	this.deposit = false;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
};

AppData.prototype.showResult = function () {
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	additionalExpensesValue.value = this.capitalize(this.addExpenses.join(', '));
	additionalIncomeValue.value = this.capitalize(this.addIncome.join(', '));
	targetMonthValue.value = this.getTargetMonth();
	incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.capitalize = (n, lower = false) =>
  (lower ? n.toLowerCase() : n).replace(/(?:^|,\s|["'([{])+\S/g, match => match.toUpperCase());
;

AppData.prototype.isString = function(n) {
	// ^[а-яА-ЯёЁa-zA-Z0-9]+$
	let reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
	//console.log(reg.test(n));
	return reg.test(n);
};

AppData.prototype.isNumber = function(n) {
	//console.log('n: ', n);
	return !isNaN(parseFloat(n)) && isFinite(n)
};

AppData.prototype.addExpensesBlock = function () {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	//parentNode получает родителя
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
	expensesItems = document.querySelectorAll('.expenses-items');

	if (expensesItems.length === 3) {
		expensesAdd.style.display = "none";
	}
};

AppData.prototype.addIncomeBlock = function () {
	let cloneIncomeItem = incomeItems[0].cloneNode(true);
	incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
	incomeItems = document.querySelectorAll('.income-items');

	if (incomeItems.length === 3) {
		incomeAdd.style.display = "none";
	}
};

AppData.prototype.getExpenses = function () { 
	console.log(this);
	const _this = this;
	expensesItems.forEach(function (item) {
		const itemExpenses = item.querySelector('.expenses-title').value;
		const cashExpenses = item.querySelector('.expenses-amount').value;
		if ( itemExpenses !== '' && cashExpenses !== '' ) {
			_this.expenses[itemExpenses] = +cashExpenses;
		}
	})
};

AppData.prototype.getIncome = function () {
	const _this = this;
	incomeItems.forEach(function (item) {
		const itemIncome = item.querySelector('.income-title').value;
		const cashIncome = item.querySelector('.income-amount').value;
		if ( itemIncome !== '' && cashIncome !== '' ) {
		//} if (!isString(itemIncome) && !isNumber(cashIncome)) {
			_this.income[itemIncome] = +cashIncome;
		}
	})
};

AppData.prototype.getAddExpenses = function () {
	const _this = this;
	let addExpenses = additionalExpensesItem.value.split(',');
	addExpenses.forEach(function (item) {
		item = item.trim();
		if (item !== '') {
			_this.addExpenses.push(item);
		}
	})
};

AppData.prototype.getAddImcome = function () {
	const _this = this;
	additionalIncomeItem.forEach(function (item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			_this.addIncome.push(itemValue);
		}
	})
};

AppData.prototype.getExpensesMonth = function () { 
	this.expensesMonth = 0;
	for (let item in this.expenses) {
		this.expensesMonth += this.expenses[item];
	}
};
AppData.prototype.getIncomeMonth = function () {
	this.incomeMonth = 0;
	for (let item in appData.income) {
		this.incomeMonth += this.income[item];
	}
};

AppData.prototype.getBudget = function () { 
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
	return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getInfoDeposit = function () {
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
};

AppData.prototype.calcSavedMoney = function () {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.startDisable = function () {
	//start.disabled = !isNumber(salaryAmount.value.trim());
	start.disabled = isNaN(parseFloat(salaryAmount.value.trim()));
	if (start.disabled) {
		start.style.cursor = 'not-allowed';
	} else {
		start.style.cursor = 'pointer';
	}
};

AppData.prototype.eventListeners = function () {
	const startBtn = this.start.bind(this);
	const cancelBtn = this.cancel.bind(this);
	const _this = this;

	this.startDisable();
	start.addEventListener('click', startBtn);
	cancel.addEventListener('click', cancelBtn)
	expensesAdd.addEventListener('click', this.addExpensesBlock);
	incomeAdd.addEventListener('click', this.addIncomeBlock);
	periodSelect.addEventListener('input', function (event) {
		document.querySelector('.period-amount').textContent = event.target.value;
		incomePeriodValue.value = _this.calcSavedMoney();
	});
	salaryAmount.addEventListener('input', this.startDisable);
};

const appData = new AppData;

appData.eventListeners();
