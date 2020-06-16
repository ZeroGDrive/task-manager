const calculateTip = (total, tipPercent = 0.25) => {
  const tip = total * tipPercent;
  return total + tip;
};

const cToF = (temp) => {
  return temp * 1.8 + 32;
};

const fToC = (temp) => {
  return (temp - 32) / 1.8;
};

module.exports = {
  calculateTip,
  cToF,
  fToC,
};
