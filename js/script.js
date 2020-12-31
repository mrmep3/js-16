'use strict';

class toDo {
	constructor (form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
	}

	addToStorage() {
		localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
	}

	render() {
		this.todoList.textContent = '';
		this.todoCompleted.textContent = '';
		this.todoData.forEach(this.createItem, this);
		this.addToStorage();
	}
	// или стелочной
	createItem(todo) {
		const item = document.createElement('li');
		item.classList.add('todo-item');
		item.key = todo.key;
		item.insertAdjacentHTML('beforeend', `
			<span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		`);

		if (todo.completed) {
			this.todoCompleted.append(item);
		} else {
			this.todoList.append(item);
		}
	}

	deleteItem(target) {
		const keyElem = target.closest('ul>li').key;
		this.todoData.delete(keyElem);
		this.render();
	}

	completedItem(target) {
		const keyElem = target.closest('ul>li').key;
		this.todoData.forEach((element) => {
			if (keyElem === element.key) {
				if (element.completed === false) {
					element.completed = true;
				} else {
					element.completed = false;
				}
				this.render();
			}
		})
	}

	addTodo(event) {
		event.preventDefault();
		if (!this.isString(this.input.value)) {
			alert('Пустое дело добавить нельзя!')
		} else {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
			};
			this.todoData.set(newTodo.key, newTodo);
			this.render();
		}
		this.input.value = '';
	}

	isString(item) {
		let reg = /^[а-яА-ЯёЁa-zA-Z0-9\s,]+$/;
		return reg.test(item);
	}

	generateKey() {
		return Math.random().toString(36).substring(2, 15);
		//console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
	}

	handler(event) {
		const target = event.target;

		if (!target.matches('.todo-remove, .todo-complete')) {
			return;
		}
		if (target.matches('.todo-complete')) {
			this.completedItem(target);
		}else if (target.matches('.todo-remove')) {
			this.deleteItem(target);
		}
	}

	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.todoList.addEventListener('click', this.handler.bind(this));
		this.todoCompleted.addEventListener('click', this.handler.bind(this));
		this.render();
	}

};

const todo = new toDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();

