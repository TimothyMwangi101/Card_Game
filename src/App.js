import { React, useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

const Cards = createCards();
/**
 * Combines the values and suits to create a unique card object.
 * @returns {Card[]} an Array of Card objects
 */
function createCards() {
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["C", "D", "H", "S"];
  let arr = [];
  for (let i = 0; i < values.length; i++) {
    for (let s = 0; s < suits.length; s++) {
      arr.push(new Card(values[i] + suits[s]));
    }
  }
  return arr;
}
/**
 * Fetches a card from `Cards[]` and returns it. Doesn't return drawn cards
 * @param {number} index the index of a card in the `Cards[]`
 * @param {boolean} wildcard if true, ignore weather a card is drawn
 * @returns {Card} A card
 */
function fetchCard(index, wildCard = false) {
  const card = Cards[index];
  //if i cant draw or is deleted
  if ((card.getIsDeleted() || card.getIsDrawn()) && !wildCard)
    return fetchCard(Math.floor(Math.random() * Cards.length));
  card.setIsDrawn(true);
  return card;
}
/**
 * Set's `isDeleted()` and `isDrawn()` to  `false` for evrey card
 * @returns {void}
 */
function resetDraw() {
  Cards.forEach(card => {
    card.setIsDeleted(false);
    card.setIsDrawn(false);
  });
}
/**
 * Renders buttons that control card dealing, resetting, tossing, wildcard drawing, and regrouping.
 *
 * @param {object} props The props.
 * @param {function} props.handleClick Handle Click
 * @param {function} props.handleReset Handle reset.
 * @param {function} props.tossed Tossing function.
 * @param {function} props.regroup Regrouping function.
 * @returns {JSX.Element} A div containing multiple button elements.
*/
function ControlButtons({ props }) {
  return (
    <div id="buttonDiv" className='d-flex flex-wrap flex-row'>
      <button type="button" className="btn btn-outline-primary btn-sm custom-btn" onClick={() => props.handleClick(5)}>Deal 5</button>
      <button type="button" className="btn btn-outline-secondary custom-btn" onClick={() => props.handleClick(7)}>Deal 7</button>
      <button type="button" className="btn btn-outline-success custom-btn" onClick={() => props.handleReset()}>Reset</button>
      <button type="button" className="btn btn-outline-danger custom-btn" onClick={() => props.tossed()}>Toss</button>
      <button type="button" className="btn btn-outline-warning custom-btn" onClick={() => props.handleClick(1, true)}>Wildcard</button>
      <button type="button" className="btn btn-outline-info custom-btn" onClick={() => props.regroup()}>Regroup</button>
    </div>
  );
}
/**
 * Renders a grid of Cards if `showCardDiv
 *
 * @param {object} props The props.
 * @param {boolean} props.showCardDiv if `true` the grid will display
 * @param {Card[]} props.cardState A `Card[]`
 * @param {function} props.handlePicked Handle Pick.
 * @returns {JSX.Element} Renders the cards or nothing
 *
*/
function DisplayCards({ props }) {
  if (props.showCardDiv) {
    return (
      <div id="cardDiv" className='d-flex align-items-center flex-column container flex-wrap'>
        <div className='row justify-content-center '>
          {
            props.cardState.map((c) => (
              <div className='col-sm'>
                <img
                  id={c.getValue()}
                  src={c.getPath()}
                  alt={`A Card of value:${c.getValue()}`}
                  className={`card ${(c.getIsPicked()) ? "picked" : ""}`}
                  onClick={() => props.handlePicked(c)}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
  return (
    <></>
  )
}
/**
 * Manages the state and logic for a card game, including dealing, picking, tossing, and regrouping.
 * @returns {JSX.Element} The rendered Header component.
*/
function Header() {
  const [showCardDiv, setShowCardDiv] = useState(false);
  const [cardState, setCard] = useState([]);
  const [cardCount, setCardCount] = useState(52);
  const [picked, setPicked] = useState(null);

  /**
   * Returns everything to the initial state
   * @returns {void}
   */
  function handleReset() {
    setCard([]);
    setShowCardDiv(false);
    resetDraw();
    setPicked(null);
    setCardCount(52);
  }

  /**
   * Handles the logic when a card is picked or unpicked and updates state
   * @param {Card} card The Card object that was picked.
   * @returns {void}
  */
  function handlePicked(card) {
    const updatedCards = [...cardState];
    let tempCard = card;
    tempCard.setIsPicked(!tempCard.getIsPicked());

    if (picked === card) {
      for (let i = 0; i < updatedCards.length; i++) {
        if (updatedCards[i].equals(picked)) {
          updatedCards[i].setIsPicked(false);
          break;
        }
      }
    } else if (picked) {
      const currentPicked = picked;
      //flip the bool
      currentPicked.setIsPicked(!currentPicked.getIsPicked());
      for (let i = 0; i < updatedCards.length; i++) {
        //deselecting current picked
        if (updatedCards[i].equals(currentPicked)) {
          updatedCards[i].setIsPicked(false);
        }
        //updating the array with the picked card
        else if (updatedCards[i].equals(card)) {
          updatedCards[i] = card;
        }
      }
    } else {
      for (let i = 0; i < updatedCards.length; i++) {
        if (updatedCards[i].equals(card)) {
          updatedCards[i] = card;
          break;
        }
      }
    }
    setPicked(card);
    setCard(updatedCards);
  }
  /**
   * Attempts to delete a card. Id doesnt work
   * @returns {void}
   */
  function tossed() {
    if (picked) {
      picked.setIsDeleted(true);
      setCard(cardState.filter(c => c !== picked));
      setPicked(null); 
      setCardCount(prev => prev - 1); 
    }
  }

  /**
   * Shuffles the cards in the list
   * @returns {void}
   */
  function regroup() {
    //making an exact copy
    const shuffle = [...cardState];
    for (let i = 0; i < shuffle.length; i++) {

      const card = shuffle[i];
      const index = Math.floor(Math.random() * shuffle.length);
      const temp = shuffle[index];

      shuffle[i] = temp;
      shuffle[index] = card;
    }
    setCard(shuffle);
  }
  
  /**
   * Handles the logic for dealing cards.
   *
   * @param {number} num The number of cards to deal.
   * @param {boolean} wildCard Optional flag indicating if a wildcard draw is allowed.
   * @returns {void}
  */
  function handleClick(num, wildCard = false) {
    if (num === 7 || num === 5) handleReset();

    if (cardCount > 0 || wildCard) {
      const cardsToAppend = [];

      for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * Cards.length);
        const c = fetchCard(index, wildCard);
        cardsToAppend.push(c);
      }

      //1 gets appended, 5/7 overwrite
      setCard((num === 1) ? prev => [...prev, ...cardsToAppend] : cardsToAppend)
      setCardCount(prev => Math.max(prev - cardsToAppend.length, 0));
      setShowCardDiv(true);
    }
  }

  return (
    <div className='d-flex align-items-center flex-column container'>
      <h1 id="hi" className='text-center'>Card Game</h1>
      <img
        src="https://deckofcardsapi.com/static/img/back.png"
        alt='back turned card'
        id='backCard'
        className='card'
        onClick={() => handleClick(1)}
      />

      <ControlButtons props={{ handleClick, handleReset, regroup, tossed }} />

      <h3 className={`${cardCount === 0 ? 'text-danger' : 'text-info'} mb-4`}>
        Remaining Cards: {cardCount === 0 ? "No Cards Remaining" : cardCount}
      </h3>

      <DisplayCards props={{ showCardDiv, cardState, handlePicked }} />
    </div>
  );
}
/**
 * The footer with a link to the cards
 * @returns {JSX.Element} The footer
*/
function Footer() {
  return (
    <footer className='container bg-info-subtle text-center rounded my-3'>
      <p>Cards Source: <br />
        <a href='https://acbl.mybigcommerce.com/52-playing-cards/' target='_blank'>American Contract Bridge Team</a>
      </p>
    </footer>
  )
}
/**
 * Returns both the footer and header components to the user.
 * @returns {JSX.Element} the app
 */
function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
export default App;