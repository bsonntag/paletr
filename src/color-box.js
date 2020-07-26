import React from 'react';
import styles from './color-box.module.css';
import { HslInput, HexInput, RgbInput } from './inputs';

export function ColorBox({ id, color, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.colorBox} style={{ backgroundColor: color }} />
      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor={id + '_hex'}>Hex</label>
        <HexInput
          className={styles.input}
          id={id + '_hex'}
          name={id + '_hex'}
          onChange={onChange}
          color={color}
        />

        <label htmlFor={id + '_rgb'}>RGB</label>
        <RgbInput
          className={styles.input}
          id={id + '_rgb'}
          name={id + '_rgb'}
          onChange={onChange}
          color={color}
        />

        <label htmlFor={id + '_hsl'}>HSL</label>
        <HslInput
          className={styles.input}
          id={id + '_hsl'}
          name={id + '_hsl'}
          onChange={onChange}
          color={color}
        />
      </form>
    </div>
  );
}
