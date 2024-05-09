const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

//1. New {} is created
//2. function is called, this = {}
//3. {} is linked to prototype
//4. function automatically return {}

const uyen = new Person("Uyen", 2000);
console.log(uyen);

const chinh = new Person("Chinh", 2001);
const dung = new Person("Dung", 2008);

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(uyen.__proto__);
uyen.calcAge()
chinh.calcAge()
dung.calcAge()
