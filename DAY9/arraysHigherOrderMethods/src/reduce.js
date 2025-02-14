//The reduce method is used to apply a function to each element of an array, reducing the array to a single value. It’s particularly useful for accumulating results, performing calculations, or combining data from an array into a single output.

//Syntax﻿

const marks =[1, 2, 3, 4, 5, 6]
const reducedVals =marks .reduce((prev, next) => {
    console.log(`prev: ${prev} next: ${next}`);
    return prev + next;
});

console.log(reducedVals);  // 21



const myDinner = [
    { image: "🍕", name: "pizza", price: 1000 },
    { image: "🍔", name: "burger", price: 800 },
    { image: "🥪", name: "sandwich", price: 600 },
];

// Extract prices using map
const totalArray = myDinner.map(foodObj => foodObj.price);
console.log(totalArray);  // [1000, 800, 600]

// Calculate total bill using reduce
const totalBil = totalArray.reduce((prev, next) => prev + next);
console.log(totalBil);  // 2400

//shorter way
myDinner.map((foodObj)=> (foodObj.price))
.reduce((prev,next) => (prev +next))