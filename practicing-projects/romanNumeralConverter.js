/* Arabic numerals to roman numerals */
function convertToRoman(num) {
    let result = '';
    const numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanNumerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let length = numbers.length;
    for (let i = 0; i < length; i++) {
        let div = Math.floor(num / numbers[i]);
        if (div !== 0) {
            result += romanNumerals[i].repeat(div);
        }    
        num = num % numbers[i];
        if (num === 0) return result;   
    }
    return result;
   }
   
console.log(convertToRoman(3549));


/* Roman numerals to arabic numerals */