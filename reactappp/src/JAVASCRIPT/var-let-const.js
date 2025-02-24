// var example
var name = "John";
console.log(name); // Output: John

if (true) {
    var name = "Doe";
    console.log(name); // Output: Doe
}

console.log(name); // Output: Doe

// let example
let age = 30;
console.log(age); // Output: 30

if (true) {
    let age = 25;
    console.log(age); // Output: 25
}

console.log(age); // Output: 30

// const example
const city = "New York";
console.log(city); // Output: New York

// Uncommenting the following line will cause an error because `city` is a constant
// city = "Los Angeles";

if (true) {
    const city = "San Francisco";
    console.log(city); // Output: San Francisco
}

console.log(city); // Output: New York


// write a prohramme to find largest in array in javascript

let numbers = [10, 20, 5, 15, 35];
let largest = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
        largest = numbers[i];
    }
}
console.log("The largest number is: " + largest); // Output: The largest number is: 35


