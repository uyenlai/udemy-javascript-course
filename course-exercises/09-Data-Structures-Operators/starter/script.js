'use strict';
const restaurant = {
  name: 'Classico Italiano',
  address: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ time, mainIndex, starterIndex }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// restaurant.orderDelivery({
//   time: "22.30",
//   mainIndex: 2,
//   starterIndex: 2,
// });

/*
///////////////////////
// Destructuring objects
const { openingHours, name, address } = restaurant;
console.log(openingHours, name, address);

// Variable names is different than property names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 1, b: 2, c: 3 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  sat: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/

/*
/////////////////////////
// Destructuring arrays
// const [first, , second] = restaurant.categories;
// console.log(first, second);

// Switch elements
// const [a, b] = [second, first];
// console.log(a, b);

// Receive 2 return values from a function
// const [starter, main] = restaurant.order(2, 2)
// console.log(starter, main);

// Nested Array
// const nested = [1, 2, [3, 4, 5]]
// const [x, y, z] = nested
// const [j, k, [i, m, n]] = nested
// console.log(x, y, z);
// console.log(j, k, i, m, n);

// Default values
// const [p, q, r = 1] = [8, 9]
// console.log(p, q, r);
*/

/*
///////////////////////
// Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Bun Bo", "Pho"];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = "Uyen";
const letters = [...str, "L."];
console.log(letters);
//console.log(`${...str} Lai) --> not gonna work

const ingredients = [
//   prompt(`Let\s make pasta! Ingredient 1?`),
//   prompt(`Let\s make pasta! Ingredient 2?`),
//   prompt(`Let\s make pasta! Ingredient 3?`),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients)

// Objects
const newRestaurant = {...restaurant, founder: 'Uyen Lai'}
console.log(newRestaurant);

const restaurantCopy = {...restaurant}
console.log(restaurantCopy);
restaurantCopy.name = 'BunBo'
console.log(restaurantCopy);
*/

// Rest Operator

//1) Destructuring
// const [a, b, ...rest] = [1, 2, 3, 4, 5];
// console.log(a, b, rest);
// console.log(a, b, ...rest);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// // 2) Functions
// const add = function (...numbers) {
//   console.log(numbers);
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i]
//   }
//   console.log(sum);
// };
// add(2, 3);
// add(1, 4, 7, 9);
// add(2, 5, 8, 9, 4, 3, 6);

// const x = [23, 5, 7]
// console.log(...x);
// add(...x) // = add(23, 5, 7)

// const test = [1, 2, 3]
// let tong = 0;
// for (let j = 0; j < test.length; j++) {
//     tong += test[j]
// }
// console.log(tong);

// restaurant.orderPizza('Mushrooms', 'Onion', 'Olives', 'Spinach')
// restaurant.orderPizza('Mushrooms')

/* 
Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're 
gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. 
For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, 
and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array 
('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 
'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names 
(NOT an array) and prints each of them to the console, along with the number of goals that 
were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more 
likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call 
the function again with players from game.scored

GOOD LUCK 😀
*/

/*
//1
const [players1, players2] = game.players
console.log(players1, players2);

//2
const [gk, ...fieldPlayers] = players1 
console.log(gk, fieldPlayers);

//3
const allPlayers = [...players1, ...players2]
console.log(allPlayers);

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log(players1Final);

//5
//Cach 1
// const {team1, x, team2} = game.odds
// console.log(team1, x, team2);

//Cach2
const {odds: {team1, x, team2}} = game
console.log(team1, x, team2);

//6
const printGoals = function(...players) {
  console.log(`${players.length} were scored`)
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich')
printGoals(...game.scored)

//7
team1 < team2 && console.log('Team1 is more likely to win');
team1 > team2 && console.log('Team2 is more likely to win');
*/

// Coding Challenge #2

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

/*
//1
let i = 1;
for (const name of game.scored) {
  console.log(`Goal ${i}: ${name}`);
  i++
}

// for (const [i, player] of game.scored.entries())
//   console.log(`Goal ${i + 1}: ${player}`);

//2
const {odds: {team1, x, team2}} = game
let sum = 0;
console.log(Object.entries(game.odds));
for (const [key, value] of Object.entries(game.odds)) {
  sum += value
}
const average = sum / Object.entries(game.odds).length
console.log(average);

// const odds = Object.values(game.odds);
// let average = 0;
// for (const odd of odds) average += odd;
// average /= odds.length;
// console.log(average);

//3
console.log(`Odd of victory ${game.team1}: ${team1}`);
console.log(`Odd of draw: ${x}`);
console.log(`Odd of victory ${game.team2}: ${team2}`);

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }


//BONUS
const scorers = {
  Gnarby : 1,
  Hummels: 1,
  Lewandowski: 2
}
console.log(scorers);

// So the solution is to loop over the array, and add the array elements as object properties, 
//and then increase the count as we encounter a new occurence of a certain element
// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events 
that happened during the game. The values are the events themselves, and the keys are the minutes 
in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. 
So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" 
(keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or 
second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/*
//1 
const newSet = new Set()
for (const [key, value] of gameEvents) {
  newSet.add(value)
}
console.log(newSet)
const events = [...newSet]
console.log(events);

//2
// newSet.delete('🔶 Yellow card')
// console.log(newSet);

//SOLUTION: 
gameEvents.delete(64)
console.log(gameEvents);

//3
//console.log('An event happened, on average, every 9 minutes');

//SOLUTION
console.log(gameEvents.size);
//The size accessor property of Map instances returns 
//the number of elements in this map.

console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
//4
// for (const [minute, event] of gameEvents) {
//   if (minute < 45) {
//     console.log(`[FIRST HALF] ${minute}: ${event}`);
//   }else {
//     console.log(`[SECOND HALF] ${minute}: ${event}`);
//   }
// }

//SOLUTION
for (const [minute, event] of gameEvents) {
  const half = minute < 45 ? 'FIRST' : 'SECOND'
  console.log(`[${half} HALF] ${minute}: ${event}`);
}
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them 
to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will 
happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name 
conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'))
document.body.append(document.createElement('button'))

const content = document.querySelector('textarea')
const btn = document.querySelector('button') 
btn.addEventListener('click', function() {
  const text = content.value.split('\n')
  for(const [index, str] of text.entries()) {
    const pcs = str.trim().toLowerCase().split('_')
    const output = pcs[0] + pcs[1].slice(0, 1).toUpperCase() + pcs[1].slice(1)
    console.log(`${output.padEnd(30, ' ')} ${'✅'.repeat(index + 1)}`);
  }
})
*/
//CACH 2
//////////////////
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/

// String Methods Practice
//////////////////////////

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = (str) => str.slice(0, 3).toUpperCase()

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';')
  const str = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(';', 'h')})`
  console.log(str.padStart(45, ' '))
}
