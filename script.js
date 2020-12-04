'use strict';

const isString = function(n) {
	// ^[а-яА-ЯёЁa-zA-Z0-9]+$
	let reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
	//console.log(reg.test(n));
	return reg.test(n);
};

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');
//todoRemove = document.querySelector('.todo-remove'),
//test = todoList.querySelector('.todo-complete');

const todoData = [
	// сюда надо прописать данные из локалсторейдж
	{
		value: 'Делаем',
		completed: false
	},
	{
		value: 'Сделали',
		completed: true
	}
];

const render = function () {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoData.forEach(function (item) {

		const li = document.createElement('li');
		li.classList.add('todo-item');

		li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
		'<div class="todo-buttons">' +
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>'+
		'</div>';

			if (item.completed) {
				todoCompleted.append(li);
			} else {
				todoList.append(li);
			}

			const todoComplete = li.querySelector('.todo-complete');

			todoComplete.addEventListener('click', function () {
				item.completed = !item.completed;
				render();
			})
			const todoRemove = li.querySelector('.todo-remove');

			todoRemove.addEventListener('click', function () {
				console.log(item);
				const parent = todoRemove.parentNode.parentNode.parentNode;
				const child = todoRemove.parentNode.parentNode;
				const n = item.completed;
				parent.removeChild(child);
			})
			// очищаем инпут
			headerInput.value = '';
	});
};

todoControl.addEventListener( 'submit', function (event) {
	event.preventDefault();

	const newTodo = {
		value: headerInput.value.trim(),
		completed: false
	};
	if ( !isString(headerInput.value) ) {
		console.log( 'Пусто' );
		headerInput.value = '';
		alert('Введите что надо сделать?')
	} else {
		todoData.push( newTodo );
		render();
	}

} );

render();

/* test.addEventListener('click', function () {
	console.log('привет');
})
console.log(test);
 */