// Question 1: How do you create an empty array in JavaScript?
// Usingarray literal syntax: let arr = [];
let arrayOne  =[];
console.log(arrayOne)

//○ UsingtheArray() constructor: let arr = new Array();
let array2 =new Array();
console.log(array2)


// Question 2: How do you access the first and last elements of an array?

//Answer: You can access the first element of an array using index 0 and the last element using theindex array.length- 1. For example:
let arr =[1,2,3,4];
let firstElement = arr[0];
let lastElement =arr[arr.length -1];

console.log(firstElement)
console.log(lastElement)


//Question 3: How do you add an element to the end of an array?Answer: You can add an element to the end of an array using the push() method. For example:

let arr3= [1,45,89,9,9]
arr3.push(3);
console.log(arr3);

//Question 4: How do you remove the last element from an array?nswer: You can remove the last element from an array using the pop() method. For example
let arr4 = [45,66,89,9]
arr4.pop(9)
console.log(arr4)

//Question 5: How do you loop through an array in JavaScript?answer: You can loop through an array using either a for loop or a forEach() method. For example:Usingaforloop:
// ○ Usingaforloop:

//access using an i
let arr5 = [44,56,7,8]
for(let i =0;i<arr5.length;i++){
    console.log(arr5[i]);
}

//


//for each
let numbers =[3,4,5,54]
numbers.forEach((number) =>{
    console.log(`${number}`)
})

//Question 6: How do you check if an element exists in an array?Answer: You can check if an element exists in an array using the indexOf() method. If the element isnot found, indexOf() returns-1. For example:

let  arr6 =[3,4,5,4];
//not found because there is no 9 in array
if(arr6.indexOf(9)!== -1){
    console.log("element found")
}else{
    console.log("not found")
    //to indicate that the element you're searching for is not found in the array or
}
//Question 7: How do you remove an element from an array at a specific index?
// Answer: You can remove an element from an array at a specific index using the splice() method. Forexample, to remove the element at index 2:

let arr7 =[1,2,3]
arr7.splice(2,1)
console.log(arr7)


//Question 8: How do you concatenate two arrays in JavaScript?Answer: You can concatenate two arrays using the concat() method. For example:

let arr8 = [1,2];
let ar8 =[3,4];
let newArray = arr8.concat(ar8)
console.log(newArray)

//Question 1: Write a function to flatten a nested array in JavaScript.
///Flattening a nested array means converting an array that contains other arrays (and possibly nested arrays inside them) into a single array, where all the elements are at the same level, without any nested structure.

const nest= [12,[13,14],[15,16],17]

function flattenArray(nest){
    return nest.reduce(function(flat,toFlatten){
        return flat.concat(Array.isArray(toFlatten)? flattenArray(toFlatten):toFlatten);

    }, []);
}

console.log(flattenArray(nest))


//Question 2: What does the reduce() method do in the flattenArray() function above?
//Answer: The reduce() method in JavaScript takes an array and applies a function to each element, accumulating the result into a single value. In the flattenArray() function above, the reduce() methodis used to concatenate the current element (either a flattened sub-array or a non-array value) to theflattened array so far.
const marks = [1,2,3,4,56,7]
const reducem = marks.reduce((prev,next)  => {

    (`prev:${prev} + next :${next}`);
    return prev + next ;
});
console.log(reducem)


//
// Question 3: Can you give an example of a nested array that the flattenArray()function would be able to flatten?Answer 3: Sure! Here's an example of a nested array that the flattenArray() function would be able toflatten:

const nestedArray=[1, [2, [3, 4], 5], 6];
function flattenArraY(nestedArray){
    return nestedArray.reduce(function(flat,toFlatten){
        return flat.concat(Array.isArray(toFlatten)? flattenArraY(toFlatten):toFlatten);

    }, []);
}
console.log(flattenArraY(nestedArray))

///Question 4: Can you explain how the flat() method can be used to flatten an array inJavaScript?Answer: The flat() method is a built-in method in JavaScript that can be used to flatten an array. Ittakes a depth parameter, which specifies how many levels of nested arrays should be flattened. If nodepth parameter is provided, it defaults to 1. Here's an example usage:

const nestteedArray = [1, [2, [3, 4], 5], 6];
nestteedArray.flat(2)
console.log(nestteedArray)


//**Question 5: What are some potential issues to watch out for when flattening arraysin JavaScript?Answer: One potential issue to watch out for is the risk of creating a very large flattened array, whichould lead to performance issues or memory errors. Another issue to be aware of is the possibility ofcircular references in nested arrays, which could cause infinite recursion if not handled properly.Finally, different flattening methods (e.g. using reduce() vs. using flat()) may have different
//performance characteristics, so it's important to choose the method that's most appropriate for youruse case **/

/*Question 1: What is the difference between .map() and .forEach()?
 Answer:
 .map() and .forEach() are both array methods that allow you to loop through an array, but they differ
 in what they return.-- //returns original element
 ○ .map()returns a new array with the same length as the original array, where each
 element is the result of applying a callback function to the original element.
 ○ .forEach() does not return anything, but it simply executes a callback function on each
 element of the array.*/  //loops

const numberss =[1,2,3,4,5];
//The function num => num * 2 is called on each element of the array. This function takes each element (num) and multiplies it by 2.
const doubledNumbers = numberss.map(num => num *2);
console.log(doubledNumbers)

numberss.forEach(num =>console.log(num*2));



//Question 2: How do you remove an element from an array in JavaScript?Answer: You can remove an element from an array using the .splice() method. This method modifiesthe original array by removing or replacing existing elements and/or adding new elements.Example:

const   fruits = ['apple','banana','orange', 'mango']
//remove orange
console.log(fruits.splice(2,1));


// Question 3: What is the difference between .filter() and .find()?Answer: Both .filter() and .find() are array methods that allow you to search for elements in an arraythat meet certain criteria.filter() returns a new array with all elements that pass a certain test provided by acallback function..find() returns the value of the first element in the array that passes a certain testprovided by a callback function.
const nummbers =[1,2,3,4,5];
const evenNumbers = nummbers.filter(num => num %2=== 0);
console.log(evenNumbers)
const findEvenNumber =nummbers.find(num => num %2 ===0);
console.log(findEvenNumber)


//Question 5: How do you flatten a nested array in JavaScript?You can flatten a nested array (i.e. an array that contains other arrays as elements) using the .flat()method. This method returns a new array with all sub-array elements concatenated into it recursivelyup to the specified depth.
// You can flatten a nested array (i.e. an array that contains other arrays as elements) using the .flat()method. This method returns a new array with all sub-array elements concatenated into it recursivelyup to the specified depth.

const  nummmm =[1, 2, [3, 4], [5, [6, 7]]];
const flattenedNo = nummmm.flat(2)
console.log(flattenedNo)

/// Howtoget first 3 elements of array in JavaScript?To get the first three elements of an array in JavaScript, you can use the slice() method with astarting index of 0 and an ending index of 3. For example, to get the first three numbers from anarray of numbers, you can write: let firstThreeNumbers = numbers.slice(0, 3);
let nummmmme = [1,5,7,9,9,6]
let firstThreenumbers = nummmmme.slice(0,3)
console.log(firstThreenumbers)



// What is Array[-1] in JavaScript?Array[-1] in JavaScript will return the last element of the array, since negative index values countbackwards from the end of the array. So, for example, if you have an array of numbers, you canaccess the last element using array[-1].
let ar = [2,4,5,67];
let lar = ar[ar.length -1];
console.log(lar)