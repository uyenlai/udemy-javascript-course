'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-11-06T10:51:36.790Z',
    '2023-11-07T23:36:17.929Z',
    '2023-11-08T17:01:17.194Z',
    '2023-11-09T14:11:59.604Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// console.log(new Date(account1.movementsDates[0]));

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
//Format Date
const displayDate = (date, locale) => {
  const calsDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calsDaysPassed(date, new Date());
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//Display Movements
const displayMovements = (currentUser, sorted = false) => {
  containerMovements.innerHTML = '';
  const movs = sorted
    ? currentUser.movements.slice().sort((a, b) => a - b)
    : currentUser.movements;
  movs.forEach((mov, i) => {
    const date = displayDate(
      new Date(currentUser.movementsDates[i]),
      currentUser.locale
    );
    const currency = formatCur(mov, currentUser.locale, currentUser.currency);
    let type;
    mov > 0 ? (type = 'deposit') : (type = 'withdrawal');
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${date}</div>
    <div class="movements__value">${currency}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Display Balance
const calcDisplayBalance = currentUser => {
  currentUser.balance = currentUser.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );
  labelBalance.textContent = formatCur(
    currentUser.balance,
    currentUser.locale,
    currentUser.currency
  );
};

//Display Summary
const calcDisplaySummary = currentUser => {
  const incomes = currentUser.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = formatCur(
    incomes,
    currentUser.locale,
    currentUser.currency
  );
  const out = currentUser.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    currentUser.locale,
    currentUser.currency
  );
  const interest = currentUser.movements
    .filter(mov => mov > 0)
    .map(deposit => {
      return (deposit * currentUser.interestRate) / 100;
    })
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(
    interest,
    currentUser.locale,
    currentUser.currency
  );
};

//Create Username
const createUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(letter => letter[0])
      .join('');
  });
};
createUsername(accounts);

//Update UI
const updateUI = currentUser => {
  //Display balance
  calcDisplayBalance(currentUser);
  //Display summary
  calcDisplaySummary(currentUser);
  //Display movements
  displayMovements(currentUser);
};

//Timer
const logOutUserTimer = () => {
  let time = 300;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//Event handlers
let currentUser, timer;

//Implement login
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentUser = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  if (currentUser?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Display date
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const now = new Intl.DateTimeFormat(currentUser.locale, options).format(
      new Date()
    );
    labelDate.textContent = now;

    //Log Out Timer
    if (timer) clearInterval(timer);
    timer = logOutUserTimer();

    //Update UI
    updateUI(currentUser);
  }
});

//Implement transfer
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(receiverAcc);
  if (
    //Check if the receiverAccount exists and
    //the transfer amount must be larger than 0 and <= current account balance
    //and cannot transfer to the current account
    receiverAcc &&
    +inputTransferAmount.value > 0 &&
    currentUser.balance >= +inputTransferAmount.value &&
    currentUser.username !== receiverAcc.username
  ) {
    currentUser.movements.push(-inputTransferAmount.value);
    currentUser.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(+inputTransferAmount.value);
    receiverAcc.movementsDates.push(new Date().toISOString());
  }

  //Clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  //Update UI
  updateUI(currentUser);
});

//Implement request loan
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  if (
    +inputLoanAmount.value > 0 &&
    currentUser.movements.some(mov => mov >= 0.1 * +inputLoanAmount.value)
  ) {
    setTimeout(() => {
      currentUser.movements.push(+inputLoanAmount.value);
      currentUser.movementsDates.push(new Date().toISOString());

      //Clear input fields
      inputLoanAmount.value = '';
      inputLoanAmount.blur();

      //Update UI
      updateUI(currentUser);
    }, 2500);
  }
});

//Implement close account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  //Find and delete account
  if (
    currentUser?.username === inputCloseUsername.value &&
    currentUser?.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    accounts.splice(index, 1);
  }

  //Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();

  //Hide UI
  containerApp.style.opacity = 0;
});

//Implement sort
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
///////////////////////////////////////
// Converting and Checking Numbers
console.log(23 === 23.0);

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
 
// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

console.log(Number.parseInt('  2.5rem  '));
console.log(Number.parseFloat('  2.5rem  '));

// console.log(parseFloat('  2.5rem  '));

// Check if value is NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(23 / 0);
console.log(Number.isNaN(23 / 0)); //false (= infinity -> not NaN)

// Checking if value is number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false cuz the result is infinity(only values of the type number and are finite return true)

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
*/

///////////////////////////////////////
// Math and Rounding
/*
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5
console.log(8 ** (1 / 3)); //2

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

console.log(Math.min(5, 18, 23, 11, 2)); //2

console.log(Math.PI * Number.parseFloat('10px') ** 2); //3.1415.. * 10 ** 2

console.log(Math.trunc(Math.random() * 6) + 1); //random num from 1 to 5

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
// console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor('23.9')); //23

console.log(Math.trunc(23.3)); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.3));//-24

// Rounding decimals
console.log((2.7).toFixed(0)); //3
console.log((2.7).toFixed(3)); //2.700
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35
*/

///////////////////////////////////////
// The Remainder Operator
/*
console.log(5 % 2); //1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); //2
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2); //0
console.log(6 / 2); //3

console.log(7 % 2); //1
console.log(7 / 2); //3.5

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false
console.log(isEven(514)); //true

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((mov, i) => {
    if (i % 2 === 0) {
      mov.style.backgroundColor = 'orangered'
    }
    if (i % 3 === 0) {
      mov.style.backgroundColor = 'beige'
    }
  });
});
*/

///////////////////////////////////////
// Numeric Separators
/*
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('230_000'));
console.log(parseInt('230_000'));


///////////////////////////////////////
// Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');

console.log(huge + ' is REALLY big!!!');

// Divisions
console.log(11n / 3n);
console.log(10 / 3);
*/

///////////////////////////////////////
// Creating Dates

// Create a date
/*
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); //10
console.log(future.getDate()); //19
console.log(future.getDay()); //day in the week (4)
console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //0
console.log(future.toISOString()); //2037-11-19T13:23:00.000Z
console.log(future.getTime()); //2142249780000
//The getTime() method of Date instances returns the number of milliseconds for this date 
//since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC.

console.log(new Date(2142256980000)); //Thu Nov 19 2037 17:23:00 GMT+0200 (Eastern European Standard Time)

console.log(Date.now()); //1699469421521
//The Date.now() static method returns the number of milliseconds elapsed since the epoch, 
//which is defined as the midnight at the beginning of January 1, 1970, UTC.

future.setFullYear(2040); //Mon Nov 19 2040 15:23:00 GMT+0200 (Eastern European Standard Time)
console.log(future);


///////////////////////////////////////

// Operations With Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); //2142249780000

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1); //10


///////////////////////////////////////
// Internationalizing Numbers (Intl)
const num = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num)); //US:       €3,884,764.23
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));//Germany:  3.884.764,23 €
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));//Syria:    ٣٬٨٨٤٬٧٦٤٫٢٣ €
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
); //en-US €3,884,764.23


///////////////////////////////////////
// Timers

// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
/*
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/
