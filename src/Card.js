export default class Card {
    #value;
    #path;
    #isDrawn;
    #isDeleted;

    constructor(value) {
        this.#value = value;
        this.#path = `./cards/${value}.png`;
        this.#isDrawn = false;
        this.#isDeleted = false;
    }

    getValue() { return this.#value; }

    getPath() { return this.#path; }

    getIsDrawn() { return this.#isDrawn; }

    getIsDeleted() { return this.#isDeleted; }

    setIsDrawn(isDrawn) { this.#isDrawn = isDrawn; }

    setIsDeleted(isDeleted) { this.#isDeleted = isDeleted; }
}