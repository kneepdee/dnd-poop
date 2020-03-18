import React, { useRef } from 'react';
import './App.css';

const Poop = () => {
  return (
    <span
      role="img"
      aria-label="poop"
      style={{
        fontSize: '3em',
      }}
    >
      💩
    </span>
  );
};

const PageContent = () => {
  return (
    <div style={{ height: '130vh', width: '90vw', border: '2px solid black' }}>
      <div style={{ fontSize: '8em' }}>page content1</div>
      <div style={{ fontSize: '8em' }}>page content2</div>
      <div style={{ fontSize: '8em' }}>page content3</div>
      <div style={{ fontSize: '8em' }}>page content4</div>
    </div>
  );
};

const DndLayout = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'pink',
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: '50%'
      }}
    >
      {children}
    </div>
  );
};

const DraggableContainer = ({ children }) => {
  const draggableRef = useRef(null);
  const handleTouchMove = event => {
    const touch = event.targetTouches[0];
    console.log('touch:', touch)
    draggableRef.current.style.left = `${touch.clientX - 25}px`;
    draggableRef.current.style.top = `${touch.clientY - 25}px`;
  };
  const handleTouchEnd = event => {
    const touch = event.changedTouches[0];

    const touchEndCoordinates = {
      x: touch.clientX,
      y: touch.clientY
    }
    const viewPortDimensionsHalfPoints = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    // todo: handle cases where coordinates match
    // todo: rewrite to swich case
    if (touchEndCoordinates.x < viewPortDimensionsHalfPoints.x && touchEndCoordinates.y < viewPortDimensionsHalfPoints.y) {
      // upperLeft
      draggableRef.current.style.left = 0;
      draggableRef.current.style.top = 0;
    } else if (touchEndCoordinates.x > viewPortDimensionsHalfPoints.x && touchEndCoordinates.y < viewPortDimensionsHalfPoints.y) {
      // upperRight
      draggableRef.current.style.left = `${window.innerWidth - draggableRef.current.getBoundingClientRect().width}px`;
      draggableRef.current.style.top = 0;
    } else if (touchEndCoordinates.x < viewPortDimensionsHalfPoints.x && touchEndCoordinates.y > viewPortDimensionsHalfPoints.y) {
      // loweLeft
      draggableRef.current.style.left = 0;
      draggableRef.current.style.top = `${window.innerHeight - draggableRef.current.getBoundingClientRect().height}px`;
    } else if (touchEndCoordinates.x > viewPortDimensionsHalfPoints.x && touchEndCoordinates.y > viewPortDimensionsHalfPoints.y) {
      // lowerRight
      draggableRef.current.style.left = `${window.innerWidth - draggableRef.current.getBoundingClientRect().width}px`;
      draggableRef.current.style.top = `${window.innerHeight - draggableRef.current.getBoundingClientRect().height}px`;
    }

  };

  return (
    <span
      style={{
        position: 'fixed',
        top: '100px',
        left: '100px'
      }}
      ref={draggableRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </span>
  );
};

function App() {
  return (
    <>
      <PageContent />
      <DndLayout>
        <DraggableContainer>
          <Poop />
        </DraggableContainer>
      </DndLayout>
    </>
  );
}

export default App;
