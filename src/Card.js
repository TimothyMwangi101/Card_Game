/**
 * Represents a card with a value, an image path, and state bool flags.
 */
export default class Card {
    /** @type {string} The suit and value of a card */
    #value;

    /** @type {string} The file path to the card's image. */
    #path;

    /** @type {boolean} Whether the card has been drawn. */
    #isDrawn;

    /** @type {boolean} Whether the card has been deleted. */
    #isDeleted;

    /**
     * Creates a new Card.
     * @param {string} value - The suit and value of a card.
    */
    constructor(value) {
        this.#value = value;
        this.#path = `./cards/${value}.png`;
        this.#isDrawn = false;
        this.#isDeleted = false;
    }
    /**
     * Value getter 
     * @returns {string} The suit and value of a card
    */
    getValue() { return this.#value; }

    /**
     * Path getter
     * @returns {string} The file path to the card's image.
    */
    getPath() { return this.#path; }

    /** 
     * isDrawn getter 
     * @returns {boolean} `true` if drawn
    */
    getIsDrawn() { return this.#isDrawn; }

    /**
     * isDeleted getter
     * @returns {boolean} `true` if deleted
    */
    getIsDeleted() { return this.#isDeleted; }

    /** 
     * isDrawn setter 
     * @param {boolean} isDrawn new state
    */
    setIsDrawn(isDrawn) { this.#isDrawn = isDrawn; }

    /**
     * isDrawn setter
     * @param {boolean} isDeleted new state
    */
    setIsDeleted(isDeleted) { this.#isDeleted = isDeleted; }

    /**
     * String representation of the card
     * @returns {string} the card fields
    */
    toString() {
        return `Value: "${this.#value}", Path: "${this.#path}", IsDrawn: ${this.#isDrawn}, IsDeleted: ${this.#isDeleted}`;
    }
}