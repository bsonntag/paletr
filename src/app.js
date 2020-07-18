import React from 'react';
import styles from './app.module.css';
import { ColorBox } from './color-box';
import Color from 'color';
import { nanoid } from 'nanoid';

function reducer(state, action) {
  switch (action.type) {
    case 'addColor':
      return {
        ...state,
        colors: state.colors.concat(createRandomColor()),
      };

    case 'updateColor':
      return {
        ...state,
        colors: state.colors.map(({ id, color }) => {
          if (id === action.payload.id) {
            return { id, color: action.payload.newColor };
          } else {
            return { id, color };
          }
        }),
      };

    default:
      return state;
  }
}

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}

function createRandomColor() {
  return {
    id: nanoid(),
    color: Color.hsl(random(360), random(100), random(100)).toString(),
  };
}

const initialState = {
  colors: [createRandomColor()],
};

export function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div className={styles.app}>
      {state.colors.map(({ id, color }) => (
        <ColorBox
          key={id}
          id={id}
          value={color}
          onChange={(newColor) => {
            dispatch({ type: 'updateColor', payload: { id, newColor } });
          }}
        />
      ))}

      <button
        className={styles.addColor}
        onClick={() => dispatch({ type: 'addColor' })}
      >
        +
      </button>
    </div>
  );
}
