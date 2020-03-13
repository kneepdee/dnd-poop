import React, { useState } from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import TouchBackend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Preview from 'react-dnd-preview';

const ItemTypes = {
  STAR: 'star'
};

function Quarter({ children, moveStar, x, y }) {
  const [, drop] = useDrop({
    accept: ItemTypes.STAR,
    drop: () => moveStar(x, y)
  });

  const position =
    x === 0 && y === 0
      ? 'upperLeft'
      : x === 1 && y === 0
      ? 'upperRight'
      : x === 0 && y === 1
      ? 'lowerLeft'
      : x === 1 && x === 1
      ? 'lowerRight'
      : null;

  const flexValues = {
    upperLeft: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    upperRight: {
      alignItems: 'flex-start',
      justifyContent: 'flex-end'
    },
    lowerLeft: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start'
    },
    lowerRight: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    }
  };

  const style = {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: flexValues[position].alignItems,
    justifyContent: flexValues[position].justifyContent
  };

  return (
    <div style={style} ref={drop}>
      {children}
    </div>
  );
}

function Star({ indexNumber }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.STAR },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  return (
    <span
      style={{
        fontSize: '6em',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
      role="img"
      aria-label="star"
      ref={drag}
    >
      💩
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
      <Quarter x={x} y={y} moveStar={moveStar}>
        {piece}
      </Quarter>
    </div>
  );
}

const generatePreview = ({ itemType, item, style }) => {
  return (
    <div className="item-list__item" style={style}>
      <Star />
    </div>
  );
};

function Layout() {
  const [starPosition, setStarPosition] = useState([0, 0]);
  console.log('starPosition:', starPosition);

  const quarters = [];
  for (let i = 0; i < 4; i++) {
    quarters.push(renderQuarter(i, starPosition, setStarPosition));
  }

  const opts = {
    enableMouseEvents: false
  };

  return (
    <DndProvider backend={TouchBackend} options={opts}>
      <Preview generator={generatePreview} />
      <div
        style={{
          width: '100vw',
          height: '90vh',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {quarters}
      </div>
    </DndProvider>
  );
}

function App() {
  return <Layout />;
}

export default App;
