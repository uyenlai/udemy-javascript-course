function palindrome(str) {
    var newStr;
    if(str.includes('.')) {
        newStr = str.replace(/\.+/g, '').toLowerCase()
    } else {
        newStr = str;
    }
    let regex = /[^\W+_]/gim;
        var result = newStr.match(regex).join('');
        for (let i = 0; i < result.length/2; i++) {
            if(result[i] !== result[result.length - 1 - i]) {
                return false;
            }
    }
    return true;
  }
  
console.log(palindrome("eye")) //return true.
console.log(palindrome("_eye")) //return true.
console.log(palindrome("not a palindrome")) //return false.
console.log(palindrome("race car")) //return true.
console.log(palindrome("A man, a plan, a canal. Panama")) //return true.
console.log(palindrome("never odd or even")) //return true.
console.log(palindrome("nope")) //return false.
console.log(palindrome("almostomla")) //return false.
console.log(palindrome("My age is 0, 0 si ega ym.")) //return true.
console.log(palindrome("1 eye for of 1 eye.")) //return false.
console.log(palindrome("0_0 (: /-\ :) 0-0")) //return true.
console.log(palindrome("five|\_/|four")) //return false.