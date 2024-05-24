var x;
if (x == undefined) {
  console.log("x is undefined");
}

var customer = {
  name: "uyen",
};

if (customer.phoneNumber == undefined) {
  console.log("phone number is not existed");
}

const arr = [];
console.log(arr[0]);

const header = document.getElementById("header");
console.log(typeof header);

//COmparing objects
function findCarInLot(car) {
  for (var i = 0; i < lot.length; i++) {
    if (car === lot[i]) {
      return i;
    }
  }
  return -1;
}
var chevy = {
  make: "Chevy",
  model: "Bel Air",
};
var taxi = {
  make: "Webville Motors",
  model: "Taxi",
};
var fiat1 = {
  make: "Fiat",
  model: "500",
};
var fiat2 = {
  make: "Fiat",
  model: "500",
};
var lot = [chevy, taxi, fiat1, fiat2];

var loc1 = findCarInLot(fiat2);
var loc2 = findCarInLot(taxi);
var loc3 = findCarInLot(chevy);
var loc4 = findCarInLot(fiat1);

//truthy and falsy
function lieDetectorTest() {
  var lies = 0;
  var stolenDiamond = {};
  if (stolenDiamond) {
    console.log("You stole the diamond");
    lies++;
  }
  var car = {
    keysInPocket: null,
  };
  if (car.keysInPocket) {
    console.log("Uh oh, guess you stole the car!");
    lies++;
  }
  if (car.emptyGasTank) {
    console.log("You drove the car after you stole it!");
    lies++;
  }
  var foundYouAtTheCrimeScene = [];
  if (foundYouAtTheCrimeScene) {
    console.log("A sure sign of guilt");
    lies++;
  }
  if (foundYouAtTheCrimeScene[0]) {
    console.log("Caught with a stolen item!");
    lies++;
  }
  var yourName = " ";
  if (yourName) {
    console.log("Guess you lied about your name");
    lies++;
  }
  return lies;
}
var numberOfLies = lieDetectorTest();
console.log("You told " + numberOfLies + " lies!");
if (numberOfLies >= 3) {
  console.log("Guilty as charged");
}

// var text = "YOU SHOULD NEVER SHOUT WHEN TYPING";
// var presentableText = text.toLowerCase();
// if (presentableText.length > 0) {
//   alert(presentableText);
// }

