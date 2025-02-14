//filter -creates a new array with all elements  that pass the test implemented by the provided function

//must have a return  keyword  or return  immediate(

/* *.filter((value, index, array) => {
  // Function body
});

array.filter(callbackfn, thisArg);*/
//returns a new array
//requires a return
//immutable -does not alter the original array 


const availableFoods = [
    { id: "qwe234dfh", name: "Burger", image: "🍔🍔", price: 234 },
    { id: "qwe2356dxh", name: "Pizza", image: "🍕🍕", price: 400 },
    { id: "qwe2456yh", name: "Meat", image: "🍖🍖", price: 500 },
    { id: "qwe2785yh", name: "Chicken", image: "🍗🍗", price: 1200 },
];

//const filteredFoods =availableFoods.filter((value) =>(console.log(value))) //accesses all objects


const filteredFoods =availableFoods.filter((foodObject) =>(foodObject.price <450))
console.log(filteredFoods)













