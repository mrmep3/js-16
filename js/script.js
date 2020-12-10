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
	}
	if (this.selector[0] === '#') {
		elem = document.createElement('p');
		elem.id = this.selector.slice(1);
	}
	elem.style.cssText = `
		height: ${this.height}px;
		wigth: ${this.width}px;
		background: ${this.bg};
		font-size: ${this.fontSize}px;
	`;
	return elem;
};

let div = new DomElement('.block', 150, 50, 'yellow', 12);
let par = new DomElement('#best', 100, 100, 'red', 14);

document.body.appendChild(div.newElement());
document.body.appendChild(par.newElement());