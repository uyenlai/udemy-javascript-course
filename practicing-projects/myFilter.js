Array.prototype.myFilter = function(cb) {
    var output = [];
    for (var index in this) {
        if (this.hasOwnProperty(index)) {
            if(cb(this[index], index, this) === true) {
                output.push(this[index]);
            }
        }    
    }
    return output;
}




const numbers = [1, 2, 3, 4];

console.log(numbers.myFilter(function (number) {
    return number % 2 === 0;
})); Output: [2, 4]

console.log(numbers.myFilter(function (number, index) {
    return index % 2 === 0;
})); Output: [1, 3]




