"use strict";
//Variables

const country = 'Vietnam';
const continent = 'Asia';
let population = 100;

console.log(country, continent, population);

//Data types
let isIsland = false;
let language;
console.log(typeof country);
console.log(typeof continent);
console.log(typeof population);
console.log(typeof isIsland);
console.log(typeof language);

//let, const, var
language = 'vietnamese';

//basic operators
console.log(population / 2);
population++;
console.log(population);
console.log(population > 6);
console.log(population < 33);
const description = country + ' is in ' + continent + ',' + ' and its ' + population + ' million people speak ' + language
console.log(description);

//template literals
console.log(`${country} is in ${continent}, and its ${population} million people speak ${language}`);

//Type Conversion and Coercion
console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);

//Equality Operators: == vs ===
const numNeighbors = Number(prompt('How many neighbors countries does your country have?'))
if (numNeighbors === 1) {
    console.log('Only 1 border!');
}else if (numNeighbors > 1) {
    console.log('More than 1 border');
}else {
    console.log('No borders')
}

//Logical Operators
if (language === 'english' && population < 50 && !isIsland) {
    console.log(`You should live in ${country}`)
}else {
    console.log(`${country} does not meet your criteria`)
}

//The switch statement
switch(language) {
    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place')
        break;
    case 'hindi':
        console.log('Number 4')
        break;
    case 'arabic':
        console.log('5th most spoken language')
        break;
    default:
        console.log('Great language too')
        break;
}

//The Conditional (Ternary) Operator
population > 33 ? console.log(`${country}'s population is above average`)
:console.log(`${country}'s population is below average`);

//PART 2

//Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`
}

let vietnam = describeCountry('Vietnam', 100, 'Hanoi')
let finland = describeCountry('Finland', 6, 'Helsinki')
let canada = describeCountry('Canada', 39, 'Ottawa')
console.log(vietnam)
console.log(finland)
console.log(canada)

//Function Declarations vs. Expressions
function percentageOfWorld1(population) {
    return (population / 7900) * 100
}

vietnam = percentageOfWorld1(100);
console.log(vietnam);
finland = percentageOfWorld1(6);
console.log(finland);
canada = percentageOfWorld1(39)
console.log(canada);

const percentageOfWorld2 = function(population) {
    return (population / 7900) * 100
}

console.log(percentageOfWorld2(100))
console.log(percentageOfWorld2(6))
console.log(percentageOfWorld2(39))

//Arrow Functions
const percentageOfWorld3 = population => (population / 7900) * 100
console.log(percentageOfWorld3(1441));

//Functions Calling Other Functions
const describePopulation = (country, population) => {
    const percentage = percentageOfWorld1(population)
    return `${country} has ${population} million people, which is about ${percentage} of the world`
}

console.log(describePopulation('Vietnam', 100));

//Introduction to Arrays
const populations = [1441, 100, 39, 6]
console.log(populations.length === 4)

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]),
percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])]
console.log(percentages);

//Basic Array Operations (Methods)
const neighbors = ['China', 'Thailand', 'Laos'];
neighbors.push('Utopia');
console.log(neighbors);
neighbors.pop()
console.log(neighbors);
if (!neighbors.includes('Germany')) {
    console.log('Probably not a central European country :D');
}
console.log(neighbors.indexOf('China'))
neighbors[0] = 'Finland'
console.log(neighbors);

//Introduction to Objects + Objects Methods
const myCountry = {
    country: 'Vietnam',
    capital: 'Hanoi',
    language: 'vietnamese',
    population: 100,
    neighbors: ['China', 'Thailand', 'Laos'],
    describe: function() {
        console.log(`${this.country} has ${this.population} ${this.language}-speaking people, ${this.neighbors.length} neighbouring countries and a capital called ${this.capital}`)
    },
    checkIsland: function() {
        this.isIsland = !Boolean(this.neighbors.length)
        console.log(this.isIsland)
    }
}
myCountry.describe()
myCountry.checkIsland()

//Dot vs. Bracket Notation
console.log(`${myCountry.country} has ${myCountry.population} ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighbouring countries and a capital called ${myCountry.capital}`)
myCountry.population += 2
console.log(myCountry.population)
myCountry['population'] -= 2
console.log(myCountry['population'])

//Iteration: The for Loop
for (let i = 1; i < 51; i++) {
    console.log(`Voter number ${i} is currently voting`)
}

//Looping Arrays, Breaking and Continuing
const percentage2 = []
for (let i = 0; i < populations.length; i++) {
    percentage2.push(percentageOfWorld1(populations[i]))
}
console.log(percentage2);

//Looping Backwards and Loops in Loops
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
'Russia']]

for (let i = 0; i < listOfNeighbours.length; i++) {
    for (let j = 0; j < listOfNeighbours[i].length; j++) {
        console.log(`Neighbour: ${listOfNeighbours[i][j]}`)
    }
}

//The while Loop
const percentage3 = [];
let i = 0;
while(i < populations.length) {
    percentage3.push(percentageOfWorld1(populations[i]));
    i++;
}
console.log(percentage3);




