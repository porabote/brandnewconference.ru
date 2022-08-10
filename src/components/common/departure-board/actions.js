const setAlphabet = () => {
  let alphabet = [];
  for (let i = 1040; i < 1072; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
}
export const alphabet = setAlphabet();

export const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export default () => {};