"use strict";
//Objects

const iphone = {
  weight: 300,
  color: "blue",

  takePhoto() {
    console.log(this);
  },
  objChild: {
    name: "Child Object",
    test() {
      console.log(this);
    },
  },
};

//this refers to the obj which calls the method
iphone.takePhoto(); //iphone
iphone.objChild.test(); //objChild

//Constructor objects
class Car {
  constructor(name, color, weight) {
    this.name = name;
    this.color = color;
    this.weight = weight;
  }

  run() {
    console.log("Running...", this);
  }
}

const mercedesS450 = new Car("MercedesS450", "black", 1200);
console.log(mercedesS450);
mercedesS450.run(); //''Running..., mercedesS450 object

class Animal {
  constructor(species, color) {
    this.species = species;
    this.color = color;
  }

  //this is the modern way
  makeSound(sound) {
    console.log(this);
    console.log(`${this.species} makes ${sound}`);
  }
}

/*
//this is the old way
Animal.prototype.sound = function (sound) {
  console.log(this);
  console.log(`${this.species} makes ${sound}`);
};
*/

const dog = new Animal("Dog", "white");
dog.makeSound("woof woof");
console.log(dog.hasOwnProperty("makeSound"));
dog.showWeight = function (weight) {
  console.log(`${this.species} weighs ${weight} kg`);
};

dog.showWeight(3);
console.log(dog.hasOwnProperty("showWeight"));

class SubAnimal extends Animal {
  constructor(species, color, weight) {
    super(species, color);
    this.weight = weight;
  }

  showSpeed(speed, sound) {
    super.makeSound(sound);
    function test() {
      console.log("this is test: ", this);
    }
    test();
    console.log(`Weight: ${this.weight}`);
    console.log(`Speed: ${speed}`);
  }
}

// SubAnimal.prototype.showSpeed = function (speed) {
//   console.log(this);
//   function test() {
//     console.log(this);
//   }
//   test();
//   console.log(`Weight: ${this.weight}`);
//   console.log(`Speed: ${speed}`);
// };

const cat = new SubAnimal("Cat", "yellow", 2);
cat.makeSound("meow meow");
cat.showSpeed(5, "meow!!!");

//DOM elements
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  console.log(this); //button element
});

/*
btn.addEventListener("click", () => {
  console.log(this); // window object because arrow function doesn't have context
                    // in strict mode, this will be undefined
});
*/

//functions
function myFunc() {
  console.log(this); // window object or undefined in strict mode
}

myFunc();
window.myFunc(); //window object
