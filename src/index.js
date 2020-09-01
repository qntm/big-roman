'use strict'

/* global BigInt */

const bar = '\u0305'

const banks = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
]
const numBanks = banks.length

// Special case
const badThousand = 'I' + bar
const goodThousand = 'M'

// Converting an Arabic digit to a Roman "digit".
// Roman numerals are place-value! Except, the size of a place varies and
// sometimes it's the empty string
const arabicToRomanDigit = (arabicDigit, powerOfTen) => {
  const bank = banks[powerOfTen % numBanks]

  if (!(arabicDigit in bank)) {
    throw Error(`Not an Arabic digit: ${arabicDigit}`)
  }

  return bank[arabicDigit]
    .split('')
    .map(chr => chr + bar.repeat(Math.floor(powerOfTen / numBanks)))
    .join('')
    .replace(new RegExp(badThousand, 'g'), goodThousand)
}

const arabicToRoman = arabicNumeral => {
  if (typeof arabicNumeral !== 'string' || arabicNumeral === '') {
    throw Error(`Not a non-empty string: ${arabicNumeral}`)
  }
  return arabicNumeral
    .split('')
    .map((arabicDigit, i, arabicDigits) =>
      arabicToRomanDigit(arabicDigit, arabicDigits.length - i - 1)
    )
    .join('')
}

const bigIntToRoman = bigInt => {
  if (typeof bigInt !== 'bigint' || bigInt <= BigInt(0)) {
    throw Error(`Not a positive BigInt: ${bigInt}`)
  }
  return arabicToRoman(bigInt.toString())
}

const numberToRoman = number => {
  if (!Number.isInteger(number) || number <= 0) {
    throw Error(`Not a positive integer: ${number}`)
  }
  return bigIntToRoman(BigInt(number))
}

const romanToArabic = romanNumeral => {
  if (typeof romanNumeral !== 'string' || romanNumeral === '') {
    throw Error(`Not a non-empty string: ${romanNumeral}`)
  }

  // Brute force is a completely practical approach here. Figure out the
  // magnitude of the number we're looking at, and then work backwards
  // through the expected Roman digits, consuming each as we go.
  // If the input is gibberish then we just get 0s and parsing will fail
  // later because we didn't consume the whole string

  const barsOnFirstLetter = romanNumeral.match(new RegExp('^.(' + bar + '*)'))[1]
  const numBarsOnFirstLetter = barsOnFirstLetter.length / bar.length

  // Round up a tad.
  // E.g. for input "M", that's 0 bars, `maxTenPower` should be 3
  const maxTenPower = (numBarsOnFirstLetter + 1) * numBanks

  const arabicDigits = []
  let i = 0
  for (let tenPower = maxTenPower; tenPower >= 0; tenPower--) {
    // We search in descending order of length. This averts a potential
    // parsing issue where we would parse the "I" of "II" and then be stuck
    // forever
    const possibilities = Array(10)
      .fill()
      .map((_, j) => ({
        arabicDigit: String(j),
        romanDigit: arabicToRomanDigit(String(j), tenPower)
      }))
      .sort((a, b) => b.romanDigit.length - a.romanDigit.length)

    for (let j = 0; j < possibilities.length; j++) {
      const possibility = possibilities[j]
      if (romanNumeral.startsWith(possibility.romanDigit, i)) {
        // No leading zeroes please
        if (arabicDigits.length !== 0 || possibility.arabicDigit !== '0') {
          arabicDigits.push(possibility.arabicDigit)
        }
        i += possibility.romanDigit.length

        // Note that "" is a valid digit (0) and will ALWAYS be found
        // if we don't break now
        break
      }
    }
  }

  if (i !== romanNumeral.length) {
    throw Error(`Could not consume a Roman digit at position ${i} in: ${JSON.stringify(romanNumeral)}`)
  }

  return arabicDigits.join('')
}

const romanToBigInt = romanNumeral =>
  BigInt(romanToArabic(romanNumeral))

const romanToNumber = romanNumeral =>
  Number.parseInt(romanToArabic(romanNumeral), 10)

module.exports = {
  arabicToRoman,
  bigIntToRoman,
  numberToRoman,
  romanToArabic,
  romanToBigInt,
  romanToNumber
}
