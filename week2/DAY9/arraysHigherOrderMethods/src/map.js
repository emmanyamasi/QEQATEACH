//The map method creates a new array populated with the results of calling a provided function on every element in the calling array. Unlike forEach, map returns a new array and does not modify the original array.

//array.map(callbackfn);
//requires a new array
//requires  a return

let runners = ['kiplimo', 'kiprotich','koskei']

const new_runners =runners.map((runner)=>{
    //ITErates over  each element and performs  a given operation
    return`${runner} runs 10km race`

})
console.log(new_runners)


const initialFoodPrices = [
    { image: "🍕", name: "pizza", price: 1000 },
    { image: "🍔", name: "burger", price: 800 },
    { image: "🥪", name: "sandwich", price: 600 },
  ];

const newFoodArray = initialFoodPrices.map((foodObj) =>{
    return foodObj
})
newFoodArray //this returns a new array  containing all foods
//lets say there is aprice  hike of 50bob  add 50 bob  to eachprice
let newPrice = initialFoodPrices.map((foodObj)=> {
    return foodObj.price +50
})
newPrice