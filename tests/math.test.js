const { calculateTip, cToF, fToC } = require('../src/math');

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);

  // if (total !== 13) {
  //   throw new Error('Total tip should be 13. Got ' + total);
  // }
});

test('Should calculate total with default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test('Should convert 32F to 0C', () => {
  const temp = fToC(32);
  expect(temp).toBe(0);
});
test('Should convert 0C to 32F', () => {
  const temp = cToF(0);
  expect(temp).toBe(32);
});
