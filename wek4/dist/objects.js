"use strict";
//how to define an object literal in typescript
{ }
const person = {
    name: 'ALice',
    age: 30
};
/**const person :{
    name:string;
    age:number;
}**/ //by default  ts infers object
//explicit  type annotation
const person1 = {
    name: 'ALice',
    age: 30
};
const myDog = {
    name: 'Rex',
    age: 2,
    breed: 'german'
};
//akey of an object is always astring andis always positioned at ana index
//const syntax:{[key: string]:string}
const dynamicKeyShape = {};
dynamicKeyShape['name'] = 'john';
dynamicKeyShape['age'] = "30";
// there will be no error if you  dont   pass in a dynamic key declared
const user1 = {
    id: 1,
    name: 'john',
    email: "yuuu$@su",
    phone: 122222
};
console.log(user1);
const nameAndAge = {
    name: "alice",
    age: 30
};
const withoutLocatione = {
    name: "alice",
    age: 30
};
//types assertion and casting
//you can  explicity  tell typescript the type of an object using type  assertions
const someValues = "hey you";
const strLength = someValues.length;
console.log(strLength);
const fullName = {
    name: 'jey'
};
//# sourceMappingURL=objects.js.map