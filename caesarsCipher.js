const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

function rot13(str) {
  // create accumulator
  let accumulator = '';

  // loop through the string
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isALetter = alphabet.includes(char);
    // if char is not letter, add to acc
    if (isALetter === false) {
      accumulator += char;
    } else {
      // else, rotate + or - 13, add to acc
      const charIndex = alphabet.findIndex((c) => c === char);

      accumulator += alphabet[charIndex + 13] || alphabet[charIndex - 13];
    }
  }
  return accumulator;
}

// Change the inputs below to test
console.log(rot13('SERR PBQR PNZC'));
