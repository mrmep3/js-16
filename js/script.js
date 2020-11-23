'use strict';

const money = +prompt( 'Какой твой доход?', '' ),
		 income = 'Фриланс',
		 addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', '' ),
		 deposit = confirm( 'Есть ли у вас депозит в банке?' ),
		 mission = 100000,
		 period = 6;

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1;
	while ( isNaN( amount1 = +prompt( 'Во сколько ' + expenses1 + ' обойдется?' ) ) ); // проверяем на NaN
let expenses2 = prompt( 'Введите обязательную статью расходов?' );
let amount2;
	while ( isNaN( amount2 = +prompt( 'Во сколько ' + expenses2 + ' обойдется?' ) ) ); // проверяем на NaN

let budgetMonth = money - ( amount1 + amount2 );

let target = Math.ceil( mission / budgetMonth );

let budgetDay = money / 30;


	// Вывод типа данных
console.log( 'Тип данных переменной "money": ', typeof money );
console.log( 'Тип данных переменной "income": ', typeof income );
console.log( 'Тип данных переменной "deposit": ', typeof deposit );

	//Вывод длины строки
console.log( 'Длинная строки переменной "addExpenses": ', addExpenses.length );

	//Вывод периода и цели
console.log( 'Период равен ' + period + ' ' + 'месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей' );

	// Вывод строки в нижнем регистре
console.log( 'Нижний регистр: ', addExpenses.toLowerCase( ) );
console.log( 'Массив: ', addExpenses.split( ', ' ) );

console.log( 'Месячный бюджет: ', budgetMonth );

console.log( 'Цель будет достигнута за ' + target + (target==1?' месяц.':( (target>1&&target<5)?' месяца.':' месяцев.')));

	// Вывод переменной budgetDay
console.log( 'Дневной бюджет: ', budgetDay );

	// Условия вывода переменной budgetDay
if (budgetDay >= 1200) {
	console.log( 'У вас высокий уровень дохода' );
} else if (budgetDay <= 600) {
	console.log( 'У вас средний уровень дохода' );
} else {
	console.log( 'К сожалению у вас уровень дохода ниже среднего' );
}
