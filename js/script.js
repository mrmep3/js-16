'use strict';
//break;

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

class AppData {
	constructor() {
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
	}

	capitalize(n, lower = false) {
		(lower ? n.toLowerCase() : n).replace(/(?:^|,\s|["'([{])+\S/g, match => match.toUpperCase());
		//n.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
	}

	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	isString(n) {
		let reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
		return reg.test(n);
	}

	start() {
		this.budget = +salaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getIncomeMonth();
		this.getAddExpenses();
		this.getAddImcome();
		this.getBudget();
		this.showResult();
		this.blockInput();

		start.style.display = 'none';
		cancel.style.display = 'block';
	}

	blockInput(disabled = true) {
		const dataInput = document.querySelectorAll('.data input[type=text]');
		dataInput.forEach( (item) => {
			item.disabled = disabled;
		})
	}

	cancel() {
		incomeItems.forEach( (item, i) => {
			if ( i > 0 && i < 3 ) {
				item.remove()
			}
		})
		expensesItems.forEach( (item, i) =>{
			if ( i > 0 && i < 3 ) {
				item.remove()
			}
		})
		incomeAdd.style.display = '';
		expensesAdd.style.display = '';
		this.blockInput(false);
		document.querySelectorAll('.data input[type=text]').forEach( (item) =>{
			item.value = '';
		});
		document.querySelectorAll('.result input[type=text]').forEach( (item) => {
			item.value = '';
		});
		this.reset(),
		periodSelect.value = document.querySelector('.period-amount').textContent = 1;
		this.startDisable();
		start.style.display = 'block';
		cancel.style.display = 'none';
	}

	reset() {
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
	}

	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSavedMoney();
	}

	addExpensesBlock() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		//parentNode получает родителя
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
		expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesAdd.style.display = "none";
		}
	}

	addIncomeBlock() {
		let cloneIncomeItem = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
		incomeItems = document.querySelectorAll('.income-items');

		if (incomeItems.length === 3) {
			incomeAdd.style.display = "none";
		}
	}

	getExpenses() {
		document.querySelectorAll('.expenses-items').forEach( (item) => {
			const itemExpenses = item.querySelector('.expenses-title').value;
			const cashExpenses = item.querySelector('.expenses-amount').value;
			if ( itemExpenses !== '' && cashExpenses !== '' ) {
				this.expenses[itemExpenses] = +cashExpenses;
			}
		})
	}

	getIncome() {
		document.querySelectorAll('.income-items').forEach( (item) =>{
			const itemIncome = item.querySelector('.income-title').value;
			const cashIncome = item.querySelector('.income-amount').value;
			if ( itemIncome !== '' && cashIncome !== '' ) {
				this.income[itemIncome] = +cashIncome;
			}
		})
	}

	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach( (item) =>{
			item = item.trim();
			if (item !== '') {
				this.addExpenses.push(item);
			}
		})
	}

	getAddImcome() {
		additionalIncomeItem.forEach( (item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				console.log(itemValue);
				appData.addIncome.push(itemValue);
			}
		})
	}

	getExpensesMonth() {
		this.expensesMonth = 0;
		for (let item in this.expenses) {
			this.expensesMonth += this.expenses[item];
		}
	}

	getIncomeMonth() {
		this.incomeMonth = 0;
		for (let item in this.income) {
			this.incomeMonth += this.income[item];
		}
	}

	getBudget() {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}

	getStatusIncome() {
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
	}

	getInfoDeposit() {
		if (this.deposit) {
			let sum;
			do {
				sum = prompt ('Какой годовой процент?', '10');
			} while (!isNumber(sum));
			this.percentDeposit = +sum;
			do {
				sum = prompt ('Какой сумма заложена?', 10000);
			} while (!isNumber(sum));
			this.moneyDeposit = +sum;
		}
	}

	calcSavedMoney() {
		return this.budgetMonth * periodSelect.value;
	}

	startDisable() {
		start.disabled = isNaN(parseFloat(salaryAmount.value.trim()));
		if (start.disabled) {
			start.style.cursor = 'not-allowed';
		} else {
			start.style.cursor = 'pointer';
		}
	}

	eventListeners() {
		this.startDisable();
		start.addEventListener('click', this.start.bind(this));
		cancel.addEventListener('click', this.cancel.bind(this))
		expensesAdd.addEventListener('click', this.addExpensesBlock);
		incomeAdd.addEventListener('click', this.addIncomeBlock);
		periodSelect.addEventListener('input', (event) => {
			document.querySelector('.period-amount').textContent = event.target.value;
			incomePeriodValue.value = this.calcSavedMoney();
		});
		salaryAmount.addEventListener('input', this.startDisable);
	}

}

const appData = new AppData;

appData.eventListeners();
