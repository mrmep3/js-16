const num = 266219;
let arr = num.toString().split('');

let result = arr.reduce(function (sum, current) {
	return sum * current
});

console.log('Число:', num);
console.log('Произведение числа:', result);
console.log('Результат вовзедения в 3 степень:', result ** 3);
console.log('Первые две цифры результата:', String(result ** 3).slice(0, 2));