import React, { useState } from 'react';
import './App.css';

function Quarter({ children }) {
  return <div>{children}</div>;
}

function Star({ indexNumber }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '4em'
      }}
      role="img"
      aria-label="star"
    >
      ⭐️{indexNumber}
    </span>
  );
}

function renderQuarter(i, starPosition, setStarPosition) {
  function moveStar(toX, toY) {
    setStarPosition([toX, toY]);
  }

  const x = i % 2;
  const y = Math.floor(i / 2);
  const isStarHere = x === starPosition[0] && y === starPosition[1];
  const grey = (x + y) % 2 === 1;
  const piece = isStarHere ? <Star indexNumber={i} /> : null;

  return (
    <div
      style={{
        height: '50%',
        width: '50%',
        background: grey ? 'grey' : 'white'
      }}
      onClick={() => moveStar(x, y)}
      key={i}
    >
      <Quarter>{piece}</Quarter>
    </div>
  );
}

function Layout() {
  const [starPosition, setStarPosition] = useState([0, 0]);

  const quarters = [];
  for (let i = 0; i < 4; i++) {
    quarters.push(renderQuarter(i, starPosition, setStarPosition));
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {quarters}
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App;
