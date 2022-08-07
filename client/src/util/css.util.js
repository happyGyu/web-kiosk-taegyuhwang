const getCssValueByUnit = (prop, unit = 'rem') =>
  typeof prop === 'number' ? `${prop}${unit}` : prop;

const cssUtils = {
  getCssValueByUnit,
};

export default cssUtils;
