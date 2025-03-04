import React, { useEffect, useState } from 'react';
import './App.css';

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["C", "D", "H", "S"];
let cards = [];

for (let i = 0; i < values.length; i++) {
  for (let s = 0; s < suits.length; s++) {
    const value = values[i] + suits[s];
    cards.push({
      VALUE: value,
      DRAW: true,
      PATH: `./cards/${value}.png`
    })
  }
}

function fetchCardPNG(card) {
  if (!card.DRAW)
    return fetchCardPNG(cards[Math.floor(Math.random() * cards.length)]);
  const path = card.PATH;
  card.DRAW = false;
  return path;
}

function resetDraw() {
  cards.forEach(card => {
    card.DRAW = true;
  });
}
function remainingCards() {
  let rem = 0;
  cards.forEach(c => {
    if (c.DRAW) rem++;
  });
  return rem;
}

function ControlButtons() {
  return (
    <div id="buttonDiv">
      <button type="button" className="btn btn-outline-primary btn-sm custom-btn">Deal 5</button>
      <button type="button" className="btn btn-outline-secondary custom-btn">Deal 7</button>
      <button type="button" className="btn btn-outline-success custom-btn">Reset</button>
      <button type="button" className="btn btn-outline-danger custom-btn">Toss</button>
      <button type="button" className="btn btn-outline-warning custom-btn">Wildcard</button>
      <button type="button" className="btn btn-outline-info custom-btn">Regroup</button>
    </div>
  );
}

function Header() {
  const [showCardDiv, setShowCardDiv] = useState(false);
  const [card, setCard] = useState("");
  const [index, setIndex] = useState(Math.floor(Math.random() * cards.length));

  function handleClick() {
    setIndex(Math.floor(Math.random() * cards.length));
    setCard(fetchCardPNG(cards[index]));
    setShowCardDiv(true);
  }
  
  return (
    <header className='d-flex align-items-center flex-column container'>
      <h1 id="hi" className='text-center'>Hello World</h1>
      <img
        src="https://deckofcardsapi.com/static/img/back.png"
        alt='back turned card'
        id='backCard'
        className='card'
        onClick={handleClick}
      />
      <ControlButtons />
      {showCardDiv &&
        (<div id="cardDiv" className='container'>
          <img 
          id={index} 
          src={card} 
          alt='A Card'
          className='card'
          />
        </div>)}
    </header>
  );
}


function App() {
  return (
    <>
      <Header />
    </>
  );
}
export default App;