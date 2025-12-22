import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  arabicToRoman,
  bigIntToRoman,
  numberToRoman,
  romanToArabic,
  romanToBigInt,
  romanToNumber
} from '../src/index.js'

describe('roman', () => {
  describe('arabicToRoman', () => {
    it('works', () => {
      assert.deepEqual(arabicToRoman('123456'), 'C̅X̅X̅MMMCDLVI')
    })

    it('throws on a bad number', () => {
      assert.throws(() => arabicToRoman('123456.'), Error('Not an Arabic digit: .'))
    })

    it('handles the largest Roman numerals which will fit in a Tweet', () => {
      assert.deepEqual(arabicToRoman('38888888888887888887'), 'X̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVII')
      assert.deepEqual(arabicToRoman('38888888888887888887').length, 280)
      assert.deepEqual(arabicToRoman('38888888888887888888'), 'X̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVIII')
      assert.deepEqual(arabicToRoman('38888888888887888888').length, 281)
    })

    it('handles some other random large Roman numerals (whoops)', () => {
      assert.deepEqual(arabicToRoman('78888888888887888887'), 'L̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVII')
      assert.deepEqual(arabicToRoman('78888888888887888887').length, 280)
      assert.deepEqual(arabicToRoman('78888888888887888888'), 'L̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVIII')
      assert.deepEqual(arabicToRoman('78888888888887888888').length, 281)
    })

    it('handles numbers beyond the range of JavaScript floats', () => {
      assert.deepEqual(arabicToRoman('1' + '0'.repeat(2000)), 'C' + '\u0305'.repeat(666))
    })

    it('throws on empty strings', () => {
      assert.throws(() => arabicToRoman(''), Error('Not a non-empty string: '))
    })
  })

  describe('bigIntToRoman', () => {
    it('works', () => {
      assert.deepEqual(bigIntToRoman(1n), 'I')
      assert.deepEqual(bigIntToRoman(9007199254740991n), 'M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI')
      assert.deepEqual(bigIntToRoman(BigInt('1' + '0'.repeat(840))), 'M' + '\u0305'.repeat(279))
    })

    it('throws', () => {
      assert.throws(() => bigIntToRoman(1), Error('Not a positive BigInt: 1'))
      assert.throws(() => bigIntToRoman(0n), Error('Not a positive BigInt: 0'))
      assert.throws(() => bigIntToRoman(-1n), Error('Not a positive BigInt: -1'))
    })
  })

  describe('numberToRoman', () => {
    it('works', () => {
      assert.deepEqual(numberToRoman(Number.MAX_SAFE_INTEGER), 'M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI')
    })

    it('throws on non-integer', () => {
      assert.throws(() => numberToRoman('1'), Error('Not a positive integer: 1'))
    })

    it('throws on non-positive integer', () => {
      assert.throws(() => numberToRoman(0), Error('Not a positive integer: 0'))
      assert.throws(() => numberToRoman(-7), Error('Not a positive integer: -7'))
    })
  })

  describe('romanToArabic', () => {
    it('throws on non-string', () => {
      assert.throws(() => romanToArabic(78), Error('Not a non-empty string: 78'))
    })

    it('throws on empty string', () => {
      assert.throws(() => romanToArabic(''), Error('Not a non-empty string: '))
    })

    it('throws on an incomplete parse', () => {
      assert.throws(() => romanToArabic('CXVBI'), Error('Could not consume a Roman digit at position 3 in: "CXVBI"'))
    })

    it('does not output leading zeroes', () => {
      assert.deepEqual(romanToArabic('XVI'), '16')
      assert.deepEqual(romanToArabic('CXVI'), '116')
      assert.deepEqual(romanToArabic('DCXVI'), '616')
      assert.deepEqual(romanToArabic('MDCXVI'), '1616')
    })

    it('handles numbers beyond the range of JavaScript floats', () => {
      assert.deepEqual(romanToArabic('C' + '\u0305'.repeat(666)), '1' + '0'.repeat(2000))
    })
  })

  describe('romanToBigInt', () => {
    it('works', () => {
      assert.deepEqual(romanToBigInt('CM'), 900n)
      assert.deepEqual(romanToBigInt('M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI'), 9007199254740991n)
      assert.deepEqual(romanToBigInt('M' + '\u0305'.repeat(279)), BigInt('1' + '0'.repeat(840)))
    })
  })

  describe('romanToNumber', () => {
    it('works', () => {
      assert.deepEqual(romanToNumber('CM'), 900)
      assert.deepEqual(romanToNumber('M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI'), Number.MAX_SAFE_INTEGER)
      assert.deepEqual(romanToNumber('M' + '\u0305'.repeat(279)), Infinity)
    })
  })

  describe('round trips', () => {
    it('large numbers', () => {
      assert.deepEqual(romanToNumber(numberToRoman(1234567890)), 1234567890)
      assert.deepEqual(romanToNumber(numberToRoman(Number.MAX_VALUE)), Number.MAX_VALUE)
      assert.deepEqual(romanToBigInt(bigIntToRoman(BigInt('123'.repeat(123)))), BigInt('123'.repeat(123)))
    })

    it('exhaustive test of small numbers', () => {
      for (let i = 1; i < 10000; i++) {
        assert.deepEqual(romanToNumber(numberToRoman(i)), i)
      }
      for (let i = 1n; i < 10000n; i++) {
        assert.deepEqual(romanToBigInt(bigIntToRoman(i)), i)
      }
    })
  })
})
