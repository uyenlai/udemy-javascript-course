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

const dogs = [fluffy, fido, spot];

for (let i = 0; i < dogs.length; i++) {
  var size = "small";
  if (dogs[i].weight > 10) {
    size = "large";
  }
  console.log("Dog: " + dogs[i].name + " is a " + size + " " + dogs[i].breed);
}
