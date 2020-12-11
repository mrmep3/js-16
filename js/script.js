function DomElement (selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
};

DomElement.prototype.newElement = function () {
	let elem;
	if (this.selector[0] === '.') {
		elem = document.createElement('div');
		elem.className = this.selector.slice(1);
		elem.textContent = 'Только мы с конем, по полю идем';
	}
	if (this.selector[0] === '#') {
		elem = document.createElement('p');
		elem.id = this.selector.slice(1);
		elem.textContent = 'Только мы с конем, по полю идем ';
	}
	elem.style.cssText = `
		height: ${this.height}px;
		wigth: ${this.width}px;
		background: ${this.bg};
		font-size: ${this.fontSize}px;
	`;
	return elem;
};



let div = new DomElement('.block', 150, 50, 'yellow', 14);
let par = new DomElement('#best', 100, 100, 'red', 16);

document.body.appendChild(div.newElement());
document.body.appendChild(par.newElement());

