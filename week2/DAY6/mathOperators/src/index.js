


const marks = [56,45,67,87]
for(let index = 0; index < marks.length; index++){
    console.log(`${marks.indexOf(marks[index])}: ${marks[index]}`)
    if(index === marks.indexOf(marks[index])){
        console.log(true)
    }else{
        console.log('i have stopped')
    }
}

//pre decrement
let num3 = 0
console.log( --num3)


let num4 = 9
console.log(num4 --)
console.log(num4)

//greater than  or less than
console.log(10 < 11) //true
console.log(10<= 11)//true
console.log(10>11) //false
console.log(11>=10)//true



//math objects
console.log(typeof Math)//object
//is an object in javascript  has some keys
let  radius  = 7
console.log(Math.PI * radius **2) //153.93804002589985
console.log(Math.sqrt(16))//4

let numbers = [1,2,3,4,5,6,7]
console.log("Maximum number is", Math.max(...numbers))
console.log("Minimum number is", Math.min(...numbers))


//math.random - return a pseudo- random  number between 0 and 1
const invoiceNumber =Math.random() *10000000000000000000000
console.log(`BSRIU${Math.floor(invoiceNumber)}`)


//we want to remove the invoiceNumber decimals

//returns the largest integer less than or equal  to the input

console.log(Math.floor(4.5))//4
console.log(Math.floor(4.9))//4

//returns the smallest integer less than or equal  to the input

console.log(Math.ceil(4.5))//4
console.log(Math.ceil(4.9))//4


//round static method return sthe value of a number  rounded to the nearest integer
Math.round(4.6)
