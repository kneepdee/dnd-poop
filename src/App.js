import React, { useRef } from 'react';
import './App.css';

const DndLayout = () => {
  return (
    <div style={{ height: '90vh', width: '90vw', background: 'pink' }}>
      <DraggablePoop />
    </div>
  );
};

const DraggablePoop = () => {
  const poopRef = useRef(null);
  const handleTouchStart = event => {
    var touch = event.targetTouches[0];
    poopRef.current.style.left = `${touch.pageX}px`;
    poopRef.current.style.top = `${touch.pageY}px`;
  };
  return (
    <span
      role="img"
      aria-label="poop"
      style={{ position: 'absolute', fontSize: '3em' }}
      ref={poopRef}
      onTouchMove={handleTouchStart}
    >
      💩
    </span>
  );
};

function App() {
  return <DndLayout />;
}

export default App;
