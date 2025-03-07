//funtion block of code that executes a certain functionality - e.g fetching data  from  an online api , ca,culating average,, multiplication

//functionkeyword is used  to  define a function
// must have ()
//normal function syntax
//function nameOfFunction(){}
//arrow function syntax
//const nameOfFunction =()=>{}


//inside  the { }put code needed to be executed  based on your functionality
//const  salesdata = require( './data.json')
//function fetchSale(){
///this is where code is written
//console.log(salesdata)
//}//
//each  function  neeeds  to be  called  into the call stack to await execution


//sometime a function may have a  return vlaue
//return keyword is used to return the value needed by that value

//function that take marks and returns average and  totala
//can also  contain  an argument, - representation of a data type  to be passed as an input later when the function is called
function myGoodFn(data) {
  return data
}
console.log(myGoodFn({ name: "Ali", laptop: "Lenovo" }))

//most  of the times  the argument  is used for manipulation e.g looping

//function calculatiing total and average of marks

function average(marksArray) {
  //based on marksArray  that i will  pass later i will do some  manipulations  to calculate  average
  //get total
  let total = 0
  for (const mark of marksArray) {
    total = total + mark

  }
  //return total
  //get average=  total/numberof marks
  let average = 0
  average = total / marksArray.length
  return `total is: ${total} and average is: ${average}`

}
console.log(average([123, 455, 556, 312]))

//adding  a return  type  to  arrow function
const  circleArea = (radius) =>{
  return `the area of a circle is : ${Math.PI*radius**2}`


}

console.log(circleArea(7))


//arrow  functions  sometimes  can return  immediately and  dont need a  return keyword

const circleArea1 =(radius)=>(
  `the area of a circle is : ${Math.PI*radius**2}`

)
console.log(circleArea1(7))

//immediately invoked function
//(()=> {})
  //(function FnName(){})/// immediately invoked arrrow function
  