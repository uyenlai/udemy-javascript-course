Array.prototype.myMap = function(cb) {
    var output = [], arrayLength = this.length;
    for (var i = 0; i < arrayLength; i++) {
        output.push(cb(this[i], i))
    }
    return output
}

// Expected results
const numbers = [1, 2, 3];

console.log(numbers.myMap(function(number) {
    return number * 2;

})) // Output: [2, 4, 6]

console.log(numbers.myMap(function (number, index) {
    return number * index;
})) // Output: [0, 2, 6]

