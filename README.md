# big-roman

Roman numerals parsing/serialisation package which supports the overbar extension for numbers 4000 and above.

## Example

```js
const { numberToRoman, romanToNumber } = require('./index.js')

console.log(numberToRoman(Number.MAX_SAFE_INTEGER))
// 'M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI'

console.log(romanToNumber('M̅̅̅̅X̅̅̅̅̅V̅̅̅̅M̅̅̅M̅̅̅C̅̅̅X̅̅̅C̅̅̅M̅̅X̅̅̅C̅̅C̅̅L̅̅M̅V̅̅D̅C̅C̅X̅L̅CMXCI'))
// '9007199254740991'
```

## API

### numberToRoman(number)

Input a number *e.g.* `123456`, return a string containing the appropriate Roman numeral, in this case `'C̅X̅X̅MMMCDLVI'`. Numbers must be positive integers or an exception will be thrown. Other than that, numbers may be arbitrarily large, up to and including `Number.MAX_VALUE`, and accurate results will be returned. Note that the Roman numeral representation will *not* be truncated after around 15 "digits" of precision, you'll get the whole thing.

### arabicToRoman(string)

Input a string containing an Arabic numeral *e.g.* `'123456'` and return a string containing the appropriate Roman numeral, in this case `'C̅X̅X̅MMMCDLVI'`. Leading zeroes are okay. Decimal points, exponents and other non-digit characters will cause an exception to be thrown. Other than that, the input Arabic numeral may be arbitrarily large *e.g.* `'1' + '0'.repeat(2000)`.

### romanToArabic(string)

Input a string containing a Roman numeral *e.g.* `'C̅X̅X̅MMMCDLVI'` and return a string containing the appropriate Arabic numeral, in this case `'123456'`. As long as the input is well-formed, you will get a meaningful output containing the full decimal expansion, even if you use arbitrary numbers of overbars *e.g.* `'C' + '\u0305'.repeat(666)`. If the input is not a syntactically correct Roman numeral, an exception will be thrown. Fun fact: Roman numerals using the overbar extension cannot be described using a context-free grammar.

### romanToNumber(string)

Input a string containing a Roman numeral *e.g.* `'C̅X̅X̅MMMCDLVI'` and return the nearest available number, in this case `123456`. If the input is not a syntactically correct Roman numeral, an exception will be thrown. If the input describes a number which is too large then the returned value will be `Infinity`.
