const calculateTip = (total, tipPercent = 0.25) => {
  const tip = total * tipPercent;
  return total + tip;
};

module.exports = {
  calculateTip,
};
