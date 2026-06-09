/**
 * Класс, представляющий книгу.
 */
class Book {
    /** @type {number} Защищенное свойство года издания */
    _pubYear;
    /** @type {number} Приватное свойство цены */
    #price;

    /**
     * Создает экземпляр книги.
     * @param {string} title - Название книги.
     * @param {number} pubYear - Год издания.
     * @param {number} price - Цена книги.
     */
    constructor(title, pubYear, price) {
        this.title = title;
        this.pubYear = pubYear;
        this.price = price;
    }

    /** @returns {string} Название книги. */
    get title() { return this._title; }
    /** 
     * @param {string} value - Название (не должно быть пустым).
     * @throws {Error} Если название пустое.
     */
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error("Название книги не может быть пустым.");
        }
        this._title = value;
    }

    /** @returns {number} Год издания. */
    get pubYear() { return this._pubYear; }
    /** 
     * @param {number} value - Год (должен быть положительным числом).
     * @throws {Error} Если год неположительный.
     */
    set pubYear(value) {
        if (value <= 0) {
            throw new Error("Год издания должен быть положительным числом.");
        }
        this._pubYear = value;
    }

    /** @returns {number} Цена книги. */
    get price() { return this.#price; }
    /** 
     * @param {number} value - Цена (должна быть положительной).
     * @throws {Error} Если цена неположительная.
     */
    set price(value) {
        if (value <= 0) {
            throw new Error("Цена должна быть положительным числом.");
        }
        this.#price = value;
    }

    /**
     * Выводит в консоль название и цену книги.
     */
    show() {
        console.log(`Книга: "${this.title}", Цена: ${this.price} руб.`);
    }

    /**
     * Статический метод для сравнения книг по году издания.
     * @param {Book} bookA - Первая книга.
     * @param {Book} bookB - Вторая книга.
     * @returns {number} Результат сравнения.
     */
    static compare(bookA, bookB) {
        return bookA.pubYear - bookB.pubYear;
    }
}

// Тестирование заданий 1-3
console.log("--- Задания 1-3 (Класс Book) ---");
const myBook = new Book("Чистый код", 2008, 1500);
myBook.show(); // Вывод информации

// Проверка валидации (теперь перехватываем ошибки через try...catch)
console.log("Попытка записать некорректные данные:");

try {
    myBook.title = ""; // Вызовет ошибку
} catch (error) {
    console.warn("[Тест валидации] Успешно перехвачена ошибка:", error.message);
}

try {
    myBook.price = -100; // Вызовет ошибку
} catch (error) {
    console.warn("[Тест валидации] Успешно перехвачена ошибка:", error.message);
}

// Сортировка книг по году
const books = [
    new Book("Книга A", 2020, 500),
    new Book("Книга B", 2010, 300),
    new Book("Книга C", 2015, 400)
];
books.sort(Book.compare);
console.log("Отсортированные книги (по году):", books.map(b => `${b.title} (${b.pubYear}г.)`));


// ==========================================
// ЗАДАНИЕ 4 (Функция isEmpty)
// ==========================================

/**
 * Проверяет, пуст ли объект (включая символьные и неперечисляемые свойства).
 * @param {Object} obj - Объект для проверки.
 * @returns {boolean} true, если свойств нет, иначе false.
 */
function isEmpty(obj) {
    return Reflect.ownKeys(obj).length === 0;
}

console.log("\n--- Задание 4 (isEmpty) ---");
console.log("Пустой объект {}:", isEmpty({})); // true
console.log("Объект с Symbol {[Symbol()]: true}:", isEmpty({ [Symbol()]: true })); // false

const nonEnumObj = {};
Object.defineProperty(nonEnumObj, 'name', { value: 'John' });
console.log("Объект с неперечисляемым свойством 'name':", isEmpty(nonEnumObj)); // false


// ==========================================
// ЗАДАНИЯ 5 и 6 (Объект obj и методы addClass/removeClass)
// ==========================================

/** @type {Object} */
let obj = {
    className: 'open menu',

    /**
     * Добавляет класс в список className, если его там еще нет.
     * @param {string} cls - Имя добавляемого класса.
     * @returns {Object} Текущий объект (для цепочки вызовов).
     */
    addClass(cls) {
        let classes = this.className ? this.className.split(' ') : [];
        if (!classes.includes(cls)) {
            classes.push(cls);
        }
        this.className = classes.join(' ');
        return this;
    },

    /**
     * Удаляет класс из списка className.
     * @param {string} cls - Имя удаляемого класса.
     * @returns {Object} Текущий объект (для цепочки вызовов).
     */
    removeClass(cls) {
        let classes = this.className ? this.className.split(' ') : [];
        this.className = classes.filter(c => c !== cls).join(' ');
        return this;
    }
};

console.log("\n--- Задание 5 (Методы addClass/removeClass) ---");
obj.addClass('new').addClass('open').removeClass('menu');
console.log("Результат className:", obj.className); // "open new"


console.log("\n--- Задание 6 (Преобразование в JSON) ---");
const jsonStr = JSON.stringify(obj, null, 2);
console.log("JSON строка:\n" + jsonStr);

const obj2 = JSON.parse(jsonStr);
console.log("Проверка равенства ссылок (obj === obj2):", obj === obj2); // false
console.log("Проверка равенства содержимого (obj.className === obj2.className):", obj.className === obj2.className); // true


// ==========================================
// ЗАДАНИЕ 7 (getSecondsToday)
// ==========================================

/**
 * Возвращает количество секунд, прошедших с начала сегодняшнего дня.
 * @returns {number} Количество секунд.
 */
function getSecondsToday() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let diff = now - today;
    return Math.round(diff / 1000);
}

console.log("\n--- Задание 7 (getSecondsToday) ---");
console.log(`Прошло секунд с начала сегодняшнего дня: ${getSecondsToday()}`);


// ==========================================
// ЗАДАНИЕ 8 (formatDate)
// ==========================================

/**
 * Форматирует объект даты в строку формата "дд.мм.гг".
 * @param {Date} date - Дата для форматирования.
 * @returns {string} Строка в формате "дд.мм.гг".
 */
function formatDate(date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
}

console.log("\n--- Задание 8 (formatDate) ---");
console.log("Текущая дата:", formatDate(new Date()));
console.log("Кастомная дата (1 января 2020):", formatDate(new Date(2020, 0, 1)));
