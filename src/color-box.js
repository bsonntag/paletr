import React from 'react';
import Color from 'color';
import styles from './color-box.module.css';

export function ColorBox({ id, value, onChange }) {
  const color = new Color(value);
  const hexRef = React.useRef();
  const rgbRef = React.useRef();
  const hslRef = React.useRef();

  React.useEffect(() => {
    hexRef.current.value = color.hex().toString();
    rgbRef.current.value = color.rgb().toString();
    hslRef.current.value = color.hsl().toString();
  });

  function handleChange(event) {
    try {
      const newColor = new Color(event.target.value);
      onChange(newColor.hsl().toString());
    } catch (error) {
      // Ignore.
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.colorBox}
        style={{ backgroundColor: color.toString() }}
      />
      <form className={styles.form} onSubmit={event => event.preventDefault()}>
        <label htmlFor={id + '_hex'}>Hex</label>
        <input
          ref={hexRef}
          className={styles.input}
          id={id + '_hex'}
          onChange={handleChange}
        />

        <label htmlFor={id + '_rgb'}>RGB</label>
        <input
          ref={rgbRef}
          className={styles.input}
          id={id + '_rgb'}
          onChange={handleChange}
        />

        <label htmlFor={id + '_hsl'}>HSL</label>
        <input
          ref={hslRef}
          className={styles.input}
          id={id + '_hsl'}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
