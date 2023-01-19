export function getContrastingTextColor(color) {
    let r = parseInt(color.substr(0, 2), 16);
    let g = parseInt(color.substr(2, 2), 16);
    let b = parseInt(color.substr(4, 2), 16);
    let luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return (luminosity > 128) ? 'black' : 'white';
  }