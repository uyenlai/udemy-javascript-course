'use strict';

/*
///////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);


///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
checkIn(flight, jonas)
*/

///////////////////////////////
//Functions Accepting Callback Functions

//Callback examples
// const myFunction = function(param) {
//     param('Hoc lap trinh')
// }

// const callBackFn = function(value) {
//     console.log('Value: ', value);
// }

// myFunction(callBackFn);

// const oneWord = function(str) {
//     return str.replace(/ /g, '').toLowerCase();
// }

// const upperFirstWord = function(str) {
//     return str[0].toUpperCase() + str.slice(1);
// }

// const transformer = function(str, fn) {
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed: ${fn(str)}`);
//     console.log(`Transformed by: ${fn.name}`);
// }

// transformer('JavaScript is the best!', oneWord)
// transformer('JavaScript is the best!', upperFirstWord)

///////////////////////////////////////
// Functions Returning Functions
/*
const greet = function(greeting) {
    return function greeter(name) {
        console.log(`${greeting} ${name}`);
    }
}

const greetCall = greet('Hello')
greetCall('Uyen')
greet('Hello')('Uyen')

//Challenge
const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('Hey')('Uyen')
*/

///////////////////////////////////////
// The call and apply Methods
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book: function (flightNum, passenger) {
    console.log(
      `${passenger} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, passenger });
  },
};

lufthansa.book(242, 'Uyen');
lufthansa.book(809, 'Chinh');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Call method
book.call(eurowings, 184, 'Dung');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

//Apply Method
const flightData = [110, 'Hoa'];
// book.apply(swiss, flightData)
// console.log(swiss);

book.call(swiss, ...flightData);

///////////////////////////////////////
// The bind Method
const eurowingsEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

eurowingsEW(24, 'Tung');

const eurowingsEW24 = book.bind(eurowings, 23);
eurowingsEW24('Vy');

//With Event Listeners
lufthansa.plane = 300;

const lufthansaBuyPlane = function () {
  console.log(this);
  console.log(lufthansa.plane++);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansaBuyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 100));
console.log(addTax(0.23, 200));

const addVAT = addTax.bind(null, 0.24); //First argument of bind method is the 'this' keyword
//addVAT = value => value + value * 0.24
console.log(addVAT(200));

//Challenge
const addTax2 = function (value) {
  return function (rate) {
    console.log(`Value: ${value + value * rate}`);
  };
};
addTax2(100)(0.1);

const addVAT2 = function (rate) {
  return function (value) {
    console.log(`Value: ${value + value * rate}`);
  };
};
addVAT2(0.1)(100);
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with 
the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt 
  should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, 
  increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number 
  and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string 
as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply 
display the results array as it is, using console.log(). This should be the default option. 
If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 
'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the 
this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    const ans = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`))

    typeof ans === 'number' && ans < this.options.length && this.answers[ans]++;
    console.log(this.answers);
    this.displayResults()
    this.displayResults('string')
  },
  displayResults: function (type = 'array') {
    if (type === 'array') {
        console.log(this.answers);
    }else if (type === 'string') {
        console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
poll.displayResults.call({answers: [5, 2, 3]}, 'string')
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]})
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string')

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
    console.log('This will never run again');
  };
  runOnce();
  
  // IIFE
  (function () {
    console.log('This will never run again');
    const isPrivate = 23;
  })();
  
  // console.log(isPrivate);
  
  (() => console.log('This will ALSO never run again'))();
  
  {
    const isPrivate = 23;
    var notPrivate = 46;
  }
  // console.log(isPrivate);
  console.log(notPrivate);
  
  
  ///////////////////////////////////////
  // Closures
  const secureBooking = function () {
    let passengerCount = 0;
  
    return function () {
      passengerCount++;
      console.log(`${passengerCount} passengers`);
    };
  };
  
  const booker = secureBooking();
  
  booker();
  booker();
  booker();
  
  console.dir(booker);
  
  
  ///////////////////////////////////////
  // More Closure Examples
  // Example 1
  let f;
  
  const g = function () {
    const a = 23;
    f = function () {
      console.log(a * 2);
    };
  };
  
  const h = function () {
    const b = 777;
    f = function () {
      console.log(b * 2);
    };
  };
  
  g();
  f();
  console.dir(f);
  
  // Re-assigning f function
  h();
  f();
  console.dir(f);
  
  // Example 2
  const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
  
    setTimeout(function () {
      console.log(`We are now boarding all ${n} passengers`);
      console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
  
    console.log(`Will start boarding in ${wait} seconds`);
  };
  
  const perGroup = 1000;
  boardPassengers(180, 3);
  */

///////////////////////////////////////
// Coding Challenge #2

/* 
  This is more of a thinking challenge than a coding challenge 🤓
  
  Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!
  
  And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.
  
  GOOD LUCK 😀
  */

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
