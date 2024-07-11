"use strict";
//Code challenge 1
/*
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New speed after accelerate: ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New speed after brake: ${this.speed}`);
};

const bmw = new Car("BMW", 120);
bmw.accelerate();
bmw.brake();

const mercedes = new Car("Mercedes", 95);
mercedes.accelerate();
mercedes.brake();

//Code challenge 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return `${this.make} is going to at ${this.speed / 1.6} mi/h`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
    return `${this.make} is going to at ${this.speed} km/h`;
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
*/

//Inheritance between 'classes' contructor functions:
function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
  console.log(
    `${this.firstName} will be ${2037 - this.birthYear} years old in 2037`
  );
};

const jonas = new Person("Jonas", 1991);
jonas.calcAge();

function Student(firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  //calling Person function without the 'new' keyword is simply just a regular function calling
  //this will cause an error cuz now the 'this' keyword will not refer to the new object anymore
  //'this' now will be undefined
  this.course = course;
}

//Linking prototypes
Student.prototype = new Person();
//or
//Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2000, "Computer Science");
mike.introduce();
mike.calcAge();

//Code challenge 3
function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New speed after accelerate: ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New speed after brake: ${this.speed}`);
};

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

EV.prototype = new Car();
EV.prototype.chargeBattery = function (chargeTo) {
  return (this.charge = chargeTo);
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla.chargeBattery(90));
tesla.brake();
tesla.accelerate();

//ES6
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(
      `${this.firstName} will be ${2037 - this.birthYear} years old in 2037`
    );
  }
}

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  }

  calcAge() {
    console.log("Hello");
  }
}

const martha = new StudentCl("Martha", 2017, "Computer Science");
martha.calcAge();

//More examples
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
acc1.deposit(250);
acc1.withdraw(1500);
acc1.requestLoan(1000)
console.log(acc1);
