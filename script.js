"use strict";

const books = document.querySelectorAll('.books'),
		elemBook = document.querySelectorAll('.book');

books[0].append(elemBook[1]);
books[0].append(elemBook[0]);
books[0].append(elemBook[4]);
books[0].append(elemBook[3]);
books[0].append(elemBook[5]);
books[0].append(elemBook[2]);

// Меняем задник
document.querySelector('body').style.backgroundImage='url(./image/bg-image.jpg)';

//Удалаем рекламу
document.querySelector('.adv').remove();

// Добавили Главу 8
const elem = document.createElement('li');
const arr = elemBook[2].querySelectorAll('li');
elem.innerText = 'Глава 8: За пределами ES6';
arr[8].append(elem);

// Крутая сортировка книги 5 :))
const arrBook5 = elemBook[5].querySelectorAll('li');
arrBook5[10].insertAdjacentElement( 'beforebegin', arrBook5[8] );
arrBook5[8].insertAdjacentElement( 'beforebegin', arrBook5[5] );
arrBook5[3].insertAdjacentElement( 'beforebegin', arrBook5[9] );
arrBook5[6].insertAdjacentElement( 'beforebegin', arrBook5[2] );

// и книги 2
const arrBook2 = elemBook[0].querySelectorAll('li');
arrBook2[1].insertAdjacentElement( 'afterend', arrBook2[3] );
arrBook2[3].insertAdjacentElement( 'afterend', arrBook2[6] );
arrBook2[9].insertAdjacentElement( 'beforeend', arrBook2[2] );
arrBook2[4].insertAdjacentElement( 'afterbegin', arrBook2[8] );

// Изменение заголовка в книге 3
const str = elemBook[4].firstElementChild.innerText = 'Книга 3. this и Прототипы Объектов';
