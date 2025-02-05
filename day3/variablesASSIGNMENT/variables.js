console.log("hello world")
console.log("hey you")
//npm run dev

//1.DECLARING VARIABLES

let age =  25;
const schoolName = "Greenwood High";
let studentsList = []
console.log(age);
console.log(schoolName);
console.log(studentsList)

//differences between- let,const,var
//let -variables can be reassigned later/changed
//const - must be initializedand  cant  be changed later- objects  and arrays 
//var has to  be given an initial


//2.Naming Convections
//which of the  following variable names is invalid
//a)let $price = 100; - valid  ue of dollar sign is allowed
//b)let 1stPlace = "John";- ivalid  cannot start with a number while naming
//c) let _score= 89 ; - valid  underscore is allowed while naming
//d) let userName = "Alice";- valid  camelCase is encouraged during naming
  
  //why  is the following variable name  incorrect:
  //const #taxRate =  0.16; - use of # is not allowed while naming


//Rewrite  this variable name to follow best practices
//let MyVariableName = "Javascript";
let myVariablename ="Javascript"
console.log(myVariablename)



//3.Identifying DATA types
//whatwill be the output of the following?

console.log(typeof "hello") ;//string
console.log(typeof 99);//number
console.log(typeof true); //boolean
console.log(typeof undefined); //undefined

//identify the data ypes in this array
let data = ["Kenya", 34,false, {country :"USA"}, null];
console.log(data);
console.log(typeof(data)); //object

//How  do you  define  BigInt in Javascript?provide example-
//it is aspecial type of numeric used to define large numnbers 2^53-1
let numnum = 546789056789678n;
console.log(numnum) // output - 546789056789678n


//5 .Objects and Arrays
//create an object  person with properties name ,age, city
const person = {
     name:"Emma",
     age :40, 
     city:"NYERI"
    };
console.log(person)
///add a new property email
person.email = 'emma@gmail.com'
console.log(person)


//declare an array fruits  with 3 fruits

const fruits = ["mango", "avo","kiwi"];
console.log(fruits);
//access  thesecond item in the fruits array
console.log(fruits[1])


//Type Coercion
//what will be the output of the following
console.log("5" +2);//output52
console.log("5"-2); //output 3

//convert  the string  "100"into  an number
console.log(Number("100"));

//convert the number 50  into string

let numm = 50;
console.log(numm.toString())
console.log(typeof(numm))

//what will be the result  of this operation

console.log(5 + true); ///- output is 6 since javascripts coverts true to 1 automatically
