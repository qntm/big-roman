'use strict'

/* eslint-env jasmine */

const {
  arabicToRoman,
  numberToRoman,
  romanToArabic,
  romanToNumber
} = require('./index')

describe('roman', () => {
  describe('arabicToRoman', () => {
    it('works', () => {
      expect(arabicToRoman('123456')).toBe('C̅X̅X̅MMMCDLVI')
    })

    it('handles the largest Roman numerals which will fit in a Tweet', () => {
      expect(arabicToRoman('78888888888887888887')).toBe('L̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVII')
      expect(arabicToRoman('78888888888887888887').length).toBe(280)
      expect(arabicToRoman('78888888888887888888')).toBe('L̅̅̅̅̅̅X̅̅̅̅̅̅X̅̅̅̅̅̅V̅̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅M̅̅̅̅̅D̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅C̅̅̅̅̅L̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅X̅̅̅̅̅V̅̅̅̅̅M̅̅̅̅M̅̅̅̅M̅̅̅̅D̅̅̅̅C̅̅̅̅C̅̅̅̅C̅̅̅̅L̅̅̅̅X̅̅̅̅X̅̅̅̅X̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅M̅̅̅D̅̅̅C̅̅̅C̅̅̅C̅̅̅L̅̅̅X̅̅̅X̅̅̅X̅̅̅V̅̅̅M̅̅M̅̅M̅̅D̅̅C̅̅C̅̅C̅̅L̅̅X̅̅X̅̅X̅̅V̅̅M̅M̅D̅C̅C̅C̅L̅X̅X̅X̅V̅MMMDCCCLXXXVIII')
      expect(arabicToRoman('78888888888887888888').length).toBe(281)
    })

    it('handles numbers beyond the range of JavaScript floats', () => {
      expect(arabicToRoman('1' + '0'.repeat(2000))).toBe('C' + '\u0305'.repeat(666))
    })
  })

  describe('numberToRoman', () => {
    it('works', () => {
      expect(numberToRoman(Number.MAX_SAFE_INTEGER)).toBe('M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI')
    })
  })

  describe('romanToArabic', () => {
    it('does not output leading zeroes', () => {
      expect(romanToArabic('XVI')).toBe('16')
      expect(romanToArabic('CXVI')).toBe('116')
      expect(romanToArabic('DCXVI')).toBe('616')
      expect(romanToArabic('MDCXVI')).toBe('1616')
    })

    it('handles numbers beyond the range of JavaScript floats', () => {
      expect(romanToArabic('C' + '\u0305'.repeat(666))).toBe('1' + '0'.repeat(2000))
    })
  })

  describe('romanToNumber', () => {
    it('works', () => {
      expect(romanToNumber('CM')).toBe(900)
      expect(romanToNumber('M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI')).toBe(Number.MAX_SAFE_INTEGER)
    })
  })

  describe('round trips', () => {
    it('large numbers', () => {
      expect(romanToNumber(numberToRoman(1234567890))).toBe(1234567890)
      expect(romanToNumber(numberToRoman(Number.MAX_VALUE))).toBe(Number.MAX_VALUE)
    })

    it('exhaustive test of small numbers', () => {
      for (let i = 1; i < 10000; i++) {
        expect(romanToNumber(numberToRoman(i))).toBe(i)
      }
    })
  })
})
