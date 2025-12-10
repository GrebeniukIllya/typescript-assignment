"use strict";
function greet(name, age, isStudent) {
    const status = isStudent ? 'студент' : 'працівник';
    return `Привіт, ${name}! Тобі ${age} років і ти ${status}.`;
}
const message = greet('Світлана', 25, true);
console.log(message);
