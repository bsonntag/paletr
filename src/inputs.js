import React from 'react';
import Color from 'color';

function createColorInput({ name, parseColor, regex }) {
  function ColorInput(props) {
    const { color, onChange, ...rest } = props;
    const ref = React.useRef();

    React.useEffect(() => {
      if (ref.current === document.activeElement) {
        return;
      }

      const newColor = parseColor(color);
      const currentColor = parseColor(ref.current.value);

      if (newColor !== currentColor) {
        ref.current.value = newColor;
      }
    }, [color]);

    return (
      <input
        {...rest}
        ref={ref}
        pattern={regex.source}
        onChange={(event) => {
          const input = event.target;
          const value = input.value.toLowerCase();
          const selectionStart = input.selectionStart;
          input.value = value;
          input.setSelectionRange(selectionStart, selectionStart);

          if (regex.test(value)) {
            try {
              const newColor = new Color(value);
              onChange(newColor.hsl().toString());
            } catch (error) {
              // Ignore
            }
          }
        }}
      />
    );
  }

  ColorInput.displayName = name;

  return ColorInput;
}

export const HexInput = createColorInput({
  name: 'HexInput',
  regex: /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
  parseColor(value) {
    try {
      return new Color(value).hex().toString().toLowerCase();
    } catch (error) {
      return null;
    }
  },
});

export const RgbInput = createColorInput({
  name: 'RgbInput',
  regex: /^rgb\(\s*((\d*(?=\.)|\d+)(?:\.\d+)?)\s*,\s*((\d*(?=\.)|\d+)(?:\.\d+)?)\s*,\s*((\d*(?=\.)|\d+)(?:\.\d+)?)\s*\)$/i,
  parseColor(value) {
    try {
      return new Color(value).rgb().toString();
    } catch (error) {
      return null;
    }
  },
});

export const HslInput = createColorInput({
  name: 'HslInput',
  regex: /^hsl\(\s*([+-]?(\d*(?=\.)|\d+)(?:\.\d+)?)\s*,\s*((\d*(?=\.)|\d+)(?:\.\d+)?%)\s*,\s*((\d*(?=\.)|\d+)(?:\.\d+)?%)\s*\)$/i,
  parseColor(value) {
    try {
      return new Color(value).hsl().toString();
    } catch (error) {
      return null;
    }
  },
});
