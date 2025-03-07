/**
 * @author Timothy Mwangi
 * StAuth10244: I Timothy Mwangi, 000937691 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*//**
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

    /** @type {boolean} Whether the card has been picked. */
    #isPicked;

    /**
     * Creates a new Card.
     * 
     * @param {string} value - The suit and value of a card.
    */
    constructor(value) {
        this.#value = value;
        this.#path = `./cards/${value}.png`;
        this.#isDrawn = false;
        this.#isDeleted = false;
        this.#isPicked = false;
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
     * isPicked getter
     * @returns {boolean} `true` if picke
    */
    getIsPicked() { return this.#isPicked; }

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
     * isPicked setter
     * @returns {boolean} isPicked new state
    */
    setIsPicked(isPicked) { this.#isPicked = isPicked; }

    /**
     * Compares the value of this and param
     * @param {string} value The value of your search card
     * @returns `true` if they match
     */
    equals(card) { 
        return card.getValue() === this.getValue; 
    }

    /**
     * String representation of the card
     * @returns {string} the card fields
    */
    toString() {
        return `Value: "${this.#value}", Path: "${this.#path}", IsDrawn: ${this.#isDrawn}, IsDeleted: ${this.#isDeleted}, IsPicked: ${this.#isPicked}`;
    }
}