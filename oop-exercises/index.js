// Q1
function Person(name, age, country) {
  this.name = name;
  this.age = age;
  this.country = country;

  this.display = function () {
    console.log(
      `${this.name} is ${this.age} years old and from ${this.country}`
    );
  };
}

const cun = new Person("Cun", 24, "Vietnam");
console.log(cun);
const xu = new Person("Xu", 23, "Vietnam");
console.log(xu);

cun.display();
xu.display();

// ES6
class Person2 {
  constructor(name, age, country) {
    this.name = name;
    this.age = age;
    this.country = country;
  }

  display() {
    console.log(
      `${this.name} is ${this.age} years old and from ${this.country}`
    );
  }
}

const angie = new Person2("Angie", 25, "Greece");
console.log(angie);
const pia = new Person2("Pia", 23, "Slovenia");

angie.display();
pia.display();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q2:
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  calArea() {
    console.log(`Rectangle area is: ${this.width * this.height}`);
  }

  calPerimeter() {
    console.log(`Rectangle perimeter is: ${(this.width + this.height) * 2}`);
  }
}

const rectangle = new Rectangle(12, 10);
rectangle.calArea();
rectangle.calPerimeter();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q3:
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  display() {
    console.log(`Details: ${this.make} ${this.model} ${this.year}`);
  }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    this.doors = doors;
  }

  display() {
    super.display();
    console.log(`Number of doors: ${this.doors}`);
  }
}

const bikes = new Vehicle("Bikes", "suzuki", 2008);
bikes.display();
const bmw = new Car("BMW", "newModel", 2020, 4);
console.log(bmw);
bmw.display();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q4:
class BankAccount {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    console.log(`Account number: ${accountNumber}`);
    console.log(`Account balance: ${balance}`);
  }

  deposit(amount) {
    console.log(`Deposited: ${amount}`);
    this.balance = this.balance + amount;
  }

  withdraw(amount) {
    console.log(`Withdrew: ${amount}`);
    if (this.balance < amount) {
      console.log("Insufficcient money in account");
    } else {
      this.balance = this.balance - amount;
    }
  }

  displayBalance() {
    console.log(`Account balance is: ${this.balance}`);
  }
}

const account1 = new BankAccount("12345", 100);
account1.deposit(50);
account1.withdraw(10);
account1.displayBalance();
const account2 = new BankAccount("6789", 200);
account2.deposit(200);
account2.withdraw(500);
account2.displayBalance();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q5:

// class Shape {
//   calArea() {}
// }

// class Circle extends Shape {
//   calArea(r) {
//     super.calArea();
//     console.log(`Circle area is: ${r * r * Math.PI}`);
//   }
// }

// class Triangle extends Shape {
//   calArea(h, b) {
//     super.calArea();
//     console.log(`Triangle area is: ${0.5 * h * b}`);
//   }
// }

// const circle = new Circle();
// circle.calArea(7);
// const triangle = new Triangle();
// triangle.calArea(4, 8);

//Better solution
class Shape {
  calArea() {
    throw new Error("Calculate Area method must be overriden by subclasses");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calArea() {
    console.log(`Circle area is: ${this.radius * this.radius * Math.PI}`);
  }
}

class Triangle extends Shape {
  constructor(height, base) {
    super();
    this.height = height;
    this.base = base;
  }

  calArea() {
    console.log(`Triangle area is: ${0.5 * this.height * this.base}`);
  }
}

const circle = new Circle(7);
circle.calArea();
const triangle = new Triangle(4, 8);
triangle.calArea();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q6:
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
    console.log(`${this.name}'s salary per month is ${this.salary}`);
  }

  calAnnualSalary() {
    console.log(
      `${this.name} from ${this.department} has anuual salary is ${
        this.salary * 12
      }.`
    );
  }
}

class Manager extends Employee {
  constructor(name, salary, department) {
    super(name, salary);
    this.department = department;
  }

  calAnnualSalary() {
    super.calAnnualSalary();
    const bonuses = 0.1;
    console.log(
      `${this.name} from ${this.department} has anuual salary is ${
        this.salary * 12 + this.salary * bonuses * 12
      }.`
    );
  }
}

const angela = new Manager("Angela Luca", 5000, "Marketing");
angela.calAnnualSalary();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q7:
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  display() {
    console.log(`Book details: ${this.title} - ${this.author} - ${this.year}`);
  }
}

class EBook extends Book {
  constructor(title, author, year, price) {
    super(title, author, year);
    this.price = price;
  }

  display() {
    super.display();
    console.log(`Price: ${this.price}`);
  }
}

const history = new EBook("History", "Williams", 1978, 25);
history.display();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q8:
class Animal {
  constructor(species, sound) {
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    console.log(`Sound: ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(species, sound, color) {
    super(species, sound);
    this.color = color;
  }

  makeSound() {
    super.makeSound();
    console.log(`Color: ${this.color}`);
  }
}

const golden = new Dog("Golden", "gau gau", "white");
golden.makeSound();
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q9:
class Bank {
  constructor() {
    this.bankName = "";
    this.branches = [];
  }

  addBranch(newBranch) {
    this.branches.push(newBranch);
    console.log(`Updated after adding branch: ${this.branches}`);
  }

  removeBranch(branchName) {
    if (this.branches.includes(branchName)) {
      this.branches = this.branches.filter((branch) => branch !== branchName);
      console.log(`Updated after removing branch: ${this.branches}`);
    } else {
      console.log(
        `No branches are removed! Current branches: ${this.branches}`
      );
    }
  }
}

const bank = new Bank();
bank.addBranch("Heinola");
bank.removeBranch("Tampere");
bank.addBranch("Oulu");
bank.removeBranch("Oulu");
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q10:
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  totalPrice(quantity) {
    return quantity * this.price;
  }
}

class PersonalCareProduct extends Product {
  constructor(id, name, price, warranty) {
    super(id, name, price);
    this.warranty = warranty;
  }

  totalPrice(quantity) {
    const totalPrice = super.totalPrice(quantity);
    console.log(
      `Total price with Warranty period: ${this.warranty + totalPrice}`
    );
  }
}

const customer = new PersonalCareProduct(1, "Shampoo", 10, 2);
customer.totalPrice(3);
console.log("-------------------------------------------------------------");

//-------------------------------------------------------------------------------------//

//Q12:
class University {
  constructor() {
    this.universityName = "";
    this.departments = [];
  }

  addDepartment(name) {
    this.departments.push(name);
    return this.departments;
  }

  removeDepartment(name) {
    if (this.departments.includes(name)) {
      this.departments = this.departments.filter(
        (department) => department !== name
      );
      return this.departments;
    } else {
      return this.departments;
    }
  }

  displayAllDepartments() {
    console.log(`All departments: ${this.departments}`);
  }
}

const lab = new University();
lab.addDepartment("Marketing");
lab.addDepartment("Hr");
lab.addDepartment("Web Development");
lab.addDepartment("Law");
lab.displayAllDepartments();
lab.removeDepartment("Haha");
lab.displayAllDepartments();
lab.removeDepartment("Law");
lab.displayAllDepartments();
