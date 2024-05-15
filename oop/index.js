/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

//1. A new empty object is created
//2. this keyword is linked to the new object (this holds a reference to the current object)
//3. {} is linked to prototype
//4. function automatically return the new created object

const uyen = new Person("Uyen", 2000);
console.log(uyen);

const chinh = new Person("Chinh", 2001);
const dung = new Person("Dung", 2008);

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(uyen.__proto__);
uyen.calcAge();
chinh.calcAge();
dung.calcAge();

//A constructor of creating ducks (566/704)

const Duck = function (type, canFly) {
  this.type = type;
  this.canFly = canFly;
};

const vittroi = new Duck("vittroi", "no");
console.log(vittroi);


// (567/704)
const Dog = function (name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
};

const fluffy = new Dog("Fluffy", "Poodle", 30);
const fido = new Dog("Fido", "Mixed", 38);
const spot = new Dog("Spot", "Chihuahua", 10);
console.log(fido);

const dogs = [fluffy, fido, spot];

for (let i = 0; i < dogs.length; i++) {
  var size = "small";
  if (dogs[i].weight > 10) {
    size = "large";
  }
  console.log("Dog: " + dogs[i].name + " is a " + size + " " + dogs[i].breed);
}
*/

// 571/704
function Coffee(roast, ounces) {
  this.roast = roast;
  this.ounces = ounces;

  let size;
  this.getSize = function () {
    if (this.ounces < 10) {
      size = "small";
      return `${this.ounces}oz is a ${size}`;
    } else if (this.ounces < 16 && this.ounces > 10) {
      size = "medium";
      return `${this.ounces}oz is a ${size}`;
    } else if (this.ounces === 16 || this.ounces > 16) {
      size = "large";
      return `${this.ounces}oz is a ${size}`;
    }
  };

  this.toString = function () {
    return `You ordered a ${size} ${this.roast} coffee`;
  };
}

var houseBlend = new Coffee("House Blend", 12);
console.log(houseBlend.getSize());
console.log(houseBlend.toString());
var darkRoast = new Coffee("Dark Roast", 16);
console.log(darkRoast.getSize());
console.log(darkRoast.toString());

// 576/704
// const Car = function (
//   make,
//   model,
//   year,
//   color,
//   passengers,
//   convertible,
//   mileage,
//   started
// ) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.color = color;
//   this.passengers = passengers;
//   this.convertible = convertible;
//   this.mileage = mileage;
//   this.started = started;

//   this.start = function () {
//     this.started = true;
//   };
//   this.stop = function () {
//     this.started = false;
//   };
//   this.drive = function () {
//     if (this.started) {
//       console.log(this.make + " " + this.model + " goes zoom zoom!");
//     } else {
//       console.log("Start the engine first.");
//     }
//   };
// };

// var chevy = new Car("Chevy", "Bel Air", 1957, "red", 2, false, 1021);
// //var cadi = new Car("GM", "Cadillac", 1955, "tan", 5, false, 12892);
// var taxi = new Car("Webville Motors", "Taxi", 1955, "yellow", 4, false, 281341);
// var fiat = new Car("Fiat", "500", 1957, "Medium Blue", 2, false, 88000);
// var testCar = new Car(
//   "Webville Motors",
//   "Test Car",
//   2014,
//   "marine",
//   2,
//   true,
//   21
// );

// var cars = [chevy, taxi, fiat, testCar];
// for (var i = 0; i < cars.length; i++) {
//   cars[i].start();
//   cars[i].drive();
//   cars[i].drive();
//   cars[i].stop();
// }

/*
// Rewiring the arguments as an object literal
var cadiParams = {
  make: "GM",
  model: "Cadillac",
  year: 1955,
  color: "tan",
  passengers: 5,
  convertible: false,
  mileage: 12892,
};
var cadi = new Car(cadiParams);

var limoParams = {
  make: "Webville Motors",
  model: "limo",
  year: 1983,
  color: "black",
  passengers: 12,
  convertible: true,
  mileage: 21120,
};
var limo = new Car(limoParams);
var limoDog = new Dog("Rhapsody In Blue", "Poodle", 40);

console.log(cadi, limo, limoDog);
console.log(limo.make + " " + limo.model + " is a " + typeof limo);
console.log(limoDog.name + " is a " + typeof limoDog);

// Reworking the Car contructor
function Car(params) {
  this.make = params.make;
  this.model = params.model;
  this.year = params.year;
  this.color = params.color;
  this.passengers = params.passengers;
  this.convertible = params.convertible;
  this.mileage = params.mileage;
  this.started = false;
  this.start = function () {
    this.started = true;
  };
  this.stop = function () {
    this.started = false;
  };
  this.drive = function () {
    if (this.started) {
      alert("Zoom zoom!");
    } else {
      alert("You need to start the engine first.");
    }
  };
}

// Understanding Object Instances (584/704)
function dogCatcher(obj) {
  if (obj instanceof Dog) {
    return true;
  } else {
    return false;
  }
}

function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}
var meow = new Cat("Meow", "Siamese", 10);
var whiskers = new Cat("Whiskers", "Mixed", 12);
var fido = { name: "Fido", breed: "Mixed", weight: 38 };

function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
  this.bark = function () {
    if (this.weight > 25) {
      alert(this.name + " says Woof!");
    } else {
      alert(this.name + " says Yip!");
    }
  };
}
var fluffy = new Dog("Fluffy", "Poodle", 30);
var spot = new Dog("Spot", "Chihuahua", 10);
var dogs = [meow, whiskers, fido, fluffy, spot];
for (var i = 0; i < dogs.length; i++) {
  if (dogCatcher(dogs[i])) {
    console.log(dogs[i].name + " is a dog!");
  }
}

var date = new Date();
console.log(typeof date);
const year = date.getFullYear();
console.log(year);
*/
/* -------------------------------------------------------------------------------- */

// How to set up the prototype

//this is the constructor
var Dog = function (name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;
};

//this is a dog instance
var spot = new Dog("Spot", "Chihuahua", 10);
console.log(spot);

//set up the prototype
Dog.prototype.species = "Canine";
Dog.prototype.sitting = false;

Dog.prototype.bark = function () {
  if (this.weight > 25) {
    console.log(this.name + " says Woof!");
  } else {
    console.log(this.name + " says Yip!");
  }
};
Dog.prototype.run = function () {
  console.log("Run!");
};
Dog.prototype.wag = function () {
  console.log("Wag!");
};
Dog.prototype.sit = function () {
  if (this.sitting) {
    console.log(`${this.name} is already sitting`);
  } else {
    this.sitting = true;
    console.log(`${this.name} is now sitting`);
  }
};

var fido = new Dog("Fido", "Mixed", 38);
var fluffy = new Dog("Fluffy", "Poodle", 30);

fido.bark();
fido.run();
fido.wag();
fido.sit();
fluffy.bark();
fluffy.run();
fluffy.wag();
fluffy.sit();

//overriding the prototype
spot.bark = function () {
  console.log(this.name + " says Woof!");
};
spot.bark();
spot.run();
spot.wag();
spot.sit();

console.log(spot.hasOwnProperty("species"));
console.log(fido.hasOwnProperty("species"));

/*
// Exercise 619/704
function Robot(name, year, owner) {
  this.name = name;
  this.year = year;
  this.owner = owner;
}
Robot.prototype.maker = "ObjectsRUs";
Robot.prototype.speak = function () {
  console.log("speak");
};
Robot.prototype.makeCoffee = function () {
  console.log("make coffee");
};
Robot.prototype.blinkLights = function () {
  console.log("blink lights");
};
var robby = new Robot("Robby", 1956, "Dr. Morbius");
var rosie = new Robot("Rosie", 1962, "George Jetson");

robby.onOffSwitch = true;
robby.makeCoffee = function () {
  console.log("go to starbucks");
};
rosie.cleanHouse = function () {
  console.log("clean the house");
};

console.log(
  robby.name +
    " was made by " +
    robby.maker +
    " in " +
    robby.year +
    " and is owned by " +
    robby.owner
);
robby.makeCoffee();
robby.blinkLights();

console.log(
  rosie.name +
    " was made by " +
    rosie.maker +
    " in " +
    rosie.year +
    " and is owned by " +
    rosie.owner
);
rosie.cleanHouse();
*/

// Exercise 623/704
/*
function Game() {
  this.level = 0;
}
Game.prototype.play = function () {
  // player plays game here
  this.level++;
  console.log("Welcome to level " + this.level);
  this.unlock();
};
Game.prototype.unlock = function () {
  if (this.level === 42) {
    Robot.prototype.deployLaser = function () {
      console.log(`${this.name} is blasting you with laser beams`);
    };
  }
};

function Robot(name, year, owner) {
  this.name = name;
  this.year = year;
  this.owner = owner;
}
var game = new Game();
var robby = new Robot("Robby", 1956, "Dr. Morbius");
var rosie = new Robot("Rosie", 1962, "George Jetson");
while (game.level < 42) {
  game.play();
}
robby.deployLaser();
rosie.deployLaser();
*/

// Exercise 627/704
function Robot(name, year, owner) {
  this.name = name;
  this.year = year;
  this.owner = owner;
}
Robot.prototype.maker = "ObjectsRUs";
Robot.prototype.errorMessage = "All systems go.";
Robot.prototype.reportError = function () {
  console.log(this.name + " says " + this.errorMessage);
};
Robot.prototype.spillWater = function () {
  this.errorMessage = "I appear to have a short circuit!";
};
var robby = new Robot("Robby", 1956, "Dr. Morbius");
var rosie = new Robot("Rosie", 1962, "George Jetson");
rosie.reportError();
robby.reportError();
robby.spillWater();
rosie.reportError();
robby.reportError();
console.log(robby.hasOwnProperty("errorMessage")); //true
console.log(rosie.hasOwnProperty("errorMessage")); //false
