var Chance = require('chance');
var chance = new Chance();

var randomName = chance.name();
var randomEmail = chance.email(); 

console.log(randomName);
console.log(randomEmail);
