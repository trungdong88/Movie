const hexToRgb = (hex: string) => {
  // Remove the # symbol if present
  hex = hex.replace('#', '');

  // Split the hex value into its red, green, and blue components
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB values as an object
  return {r, g, b};
};

export {hexToRgb};
