'use strict';

export class Book {
    title;
    _pubYear;
    #price;

    constructor(title, pubYear, price) {
        this.title = title;
        this._pubYear = pubYear;
        this.#price = price;
    }

    set title(value) {
        if (value.trim() === '') {
            throw new Error('Название книги не может быть пустой строкой');
        }
        this.title = value;
    }

    get title() {
        return this.title;
    }

    get pubYear() {
        return this._pubYear;
    }

    set pubYear(value) {
        if (value <= 0) {
            throw new Error('Год издания должен быть положительным числом');
        }
        this._pubYear = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (value <= 0) {
            throw new Error('Цена должна быть положительным числом');
        }
        this.#price = value;
    }

    show() {
        console.log(`${this.title}, ${this.#price}`);
    }

    static compare(a, b) {
        return a._pubYear - b._pubYear;
    }
}

export function isEmpty(obj) {
    return Reflect.ownKeys(obj).length === 0;
}

export function addClassMethods(obj) {
    obj.addClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        if (!classes.includes(cls)) {
            classes.push(cls);
            this.className = classes.join(' ');
        }
        return this;
    };

    obj.removeClass = function(cls) {
        const classes = this.className ? this.className.split(' ') : [];
        const index = classes.indexOf(cls);
        if (index !== -1) {
            classes.splice(index, 1);
            this.className = classes.join(' ');
        }
        return this;
    };

    return obj;
}

export function getSecondsToday() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((now - start) / 1000);
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
}
