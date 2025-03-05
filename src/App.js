import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';


const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["C", "D", "H", "S"];
let cards = [];

for (let i = 0; i < values.length; i++) {
  for (let s = 0; s < suits.length; s++) {
    const value = values[i] + suits[s];
    cards.push({
      VALUE: value,
      _ISDRAWN: true,
      get ISDRAWN() {
        return this._ISDRAWN;
      },
      set ISDRAWN(value) {
        this._ISDRAWN = value;
      },
      PATH: `./cards/${value}.png`,
      DELETED: false
    })
  }
}

function fetchCard(index) {
  const card = cards[index];
  //if i cant draw or is deleted
  if (!card.ISDRAWN || !card.DELETED)
    return fetchCard(Math.floor(Math.random() * cards.length));
  card.ISDRAWN = false;
  return card;
}

function resetDraw() {
  cards.forEach(card => {
    card.ISDRAWN = true;
  });
}
function remainingCards() {
  let rem = 0;
  cards.forEach(c => {
    if (c.ISDRAWN && !c.DELETED) rem++;
  });
  return rem;
}

function ControlButtons({ props }) {
  return (
    <div id="buttonDiv">
      <button type="button" className="btn btn-outline-primary btn-sm custom-btn" onClick={() => props.handleClick(5)}>Deal 5</button>
      <button type="button" className="btn btn-outline-secondary custom-btn" onClick={() => props.handleClick(7)}>Deal 7</button>
      <button type="button" className="btn btn-outline-success custom-btn" onClick={() => props.handleReset()}>Reset</button>
      <button type="button" className="btn btn-outline-danger custom-btn">Toss</button>
      <button type="button" className="btn btn-outline-warning custom-btn">Wildcard</button>
      <button type="button" className="btn btn-outline-info custom-btn">Regroup</button>
    </div>
  );
}

function Header() {
  const [showCardDiv, setShowCardDiv] = useState(false);
  const [card, setCard] = useState([]);
  const [cardCount, setCardCount] = useState(remainingCards());
  const [clicked, setClicked] = useState("");

  function handleReset() {
    setCard([]);
    setShowCardDiv(false);
    resetDraw();
    setCardCount(remainingCards());
  }

  function picked() {
    if (clicked) {

    }
  }

  function handleClick(num) {
    if (num === 7 || num === 5) handleReset();

    if (cardCount > 0) {
      let index = Math.floor(Math.random() * cards.length);
      const cardsToAppend = [];

      for (let i = 0; i < num; i++) {
        const c = fetchCard(index);
        cardsToAppend.push(c);
      }

      //1 gets appended, 5/7 overwrite
      setCard((num === 1) ? prev => [...prev, cardsToAppend] : cardsToAppend)
    }
    console.log(card);

    setShowCardDiv(true);
    setCardCount(remainingCards());
  }

  return (
    <header className='d-flex align-items-center flex-column container'>
      <h1 id="hi" className='text-center'>Card Game</h1>
      <img
        src="https://deckofcardsapi.com/static/img/back.png"
        alt='back turned card'
        id='backCard'
        className='card'
        onClick={() => handleClick(1)}
      />

      <ControlButtons props={{ handleClick, handleReset }} />

      <h3 className={`${cardCount === 0 ? 'text-danger' : 'text-info'} mb-4`}>
        Remaining Cards: {cardCount === 0 ? "No Cards Remaining" : cardCount}
      </h3>

      {
        showCardDiv &&
        (
          <div id="cardDiv" className='d-flex align-items-center flex-column container'>
            <div className='row'>
              {
                card.map((c) => (
                  <div className='col-sm'>
                    <img
                      id={`Card${c.VALUE}`}
                      src={c.PATH}
                      alt={`A Card of value:${c.VALUE}`}
                      className={clicked + "card"}
                      onClick={picked}
                    />
                  </div>
                ))
              };
            </div>
          </div>
        )
      };
    </header>
  )
}

function App() {
  return (
    <>
      <Header />
    </>
  );
}
export default App;