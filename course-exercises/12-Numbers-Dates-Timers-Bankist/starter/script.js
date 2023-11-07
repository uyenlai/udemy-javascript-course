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
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

//Display Movements
const displayMovements = (currentUser, sorted = false) => {
  containerMovements.innerHTML = '';
  const movs = sorted
    ? currentUser.movements.slice().sort((a, b) => a - b)
    : currentUser.movements;
  movs.forEach((value, i) => {
    let type;
    value > 0 ? (type = 'deposit') : (type = 'withdrawal');
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${value.toFixed(2)} €</div>
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
  labelBalance.textContent = `${currentUser.balance.toFixed(2)} €`;
};

//Display Summary
const calcDisplaySummary = currentUser => {
  const incomes = currentUser.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;
  const out = currentUser.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} €`;
  const interest = currentUser.movements
    .filter(mov => mov > 0)
    .map(deposit => {
      return (deposit * currentUser.interestRate) / 100;
    })
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
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

//Event handlers

//Implement login
let currentUser;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentUser = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currentUser);
  if (currentUser?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

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
    receiverAcc.movements.push(+inputTransferAmount.value);
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
    currentUser.movements.some(
      mov => mov >= 0.1 * +inputLoanAmount.value
    )
  ) {
    currentUser.movements.push(+inputLoanAmount.value);

    //Clear input fields
    inputLoanAmount.value = '';
    inputLoanAmount.blur();

    //Update UI
    updateUI(currentUser);
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