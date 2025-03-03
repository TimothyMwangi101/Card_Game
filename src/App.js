import React from 'react';
import './App.css';

function ControlButtons() {
  return (
    <div  id="buttonDiv">
      <button type="button" className="btn btn-outline-primary btn-sm custom-btn">Deal 5</button>
      <button type="button" className="btn btn-outline-secondary custom-btn">Deal 7</button>
      <button type="button" className="btn btn-outline-success custom-btn">Reset</button>
      <button type="button" className="btn btn-outline-danger custom-btn">Toss</button>
      <button type="button" className="btn btn-outline-warning custom-btn">Wildcard</button>
      <button type="button" className="btn btn-outline-info custom-btn">Regroup</button>
    </div>
  );
}

function App() {
  return (
    <header className='d-flex align-items-center flex-column container'>
      <h1 id="hi" className='text-center'>Hello World</h1>;
      <img src="https://deckofcardsapi.com/static/img/back.png" alt='back turned card' id='backCard'/>
      <ControlButtons />
    </header>
  );
}
export default App;