import { React, useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

const Cards = createCards();

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

function fetchCard(index, wildCard = false) {
  const card = Cards[index];
  //if i cant draw or is deleted
  if ((card.getIsDeleted() || card.getIsDrawn()) && !wildCard)
    return fetchCard(Math.floor(Math.random() * Cards.length));
  card.setIsDrawn(true);
  return card;
}

function resetDraw() {
  Cards.forEach(card => {
    card.setIsDeleted(false);
    card.setIsDrawn(false);
  });
}

function ControlButtons({ props }) {
  return (
    <div id="buttonDiv" className='d-flex flex-wrap flex-row'>
      <button type="button" className="btn btn-outline-primary btn-sm custom-btn" onClick={() => props.handleClick(5)}>Deal 5</button>
      <button type="button" className="btn btn-outline-secondary custom-btn" onClick={() => props.handleClick(7)}>Deal 7</button>
      <button type="button" className="btn btn-outline-success custom-btn" onClick={() => props.handleReset()}>Reset</button>
      <button type="button" className="btn btn-outline-danger custom-btn">Toss</button>
      <button type="button" className="btn btn-outline-warning custom-btn" onClick={() => props.handleClick(1, true)}>Wildcard</button>
      <button type="button" className="btn btn-outline-info custom-btn" onClick={() => props.regroup()}>Regroup</button>
    </div>
  );
}

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

function Header() {
  const [showCardDiv, setShowCardDiv] = useState(false);
  const [cardState, setCard] = useState([]);
  const [cardCount, setCardCount] = useState(52);
  const [picked, setPicked] = useState(false);

  function handleReset() {
    setCard([]);
    setShowCardDiv(false);
    resetDraw();
    setCardCount(52);
  }

  function handlePicked(card) {
    const updatedCards = cardState.map(c => {
      if (c.getValue() === card.getValue()) {
        c.setIsPicked(!c.getIsPicked());
      }
      setPicked(true);
      return c;
    });
    setCard(updatedCards);
  }


  function regroup() {
    //making an exact copy
    const shuffle = [...cardState];
    for (let i = 0; i < shuffle.length; i++) {

      let card = shuffle[i];
      const index = Math.floor(Math.random() * shuffle.length);
      let temp = shuffle[index];

      shuffle[i] = temp;
      shuffle[index] = card;
    }
    setCard(shuffle);
  }

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

      <ControlButtons props={{ handleClick, handleReset, regroup }} />

      <h3 className={`${cardCount === 0 ? 'text-danger' : 'text-info'} mb-4`}>
        Remaining Cards: {cardCount === 0 ? "No Cards Remaining" : cardCount}
      </h3>

      <DisplayCards props={{ showCardDiv, cardState, handlePicked }} />
    </div>
  );
}
function Footer() {
  return (
    <footer className='container bg-info-subtle text-center rounded my-3'>
      <p>Cards Source: <br />
        <a href='https://acbl.mybigcommerce.com/52-playing-cards/' target='_blank'>American Contract Bridge Team</a>
      </p>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
export default App;