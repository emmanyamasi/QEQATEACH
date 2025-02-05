//how to declare avariable
let name = "" //variables that can  be reasigned later
const marks = {}; //must be initialized -cant change

var students = [];//have to be given an initial


//naming variables rules-
//1. use camel case
let isLoggedIn = true
//2. start with letter,_$
let $dollars = 234
let _dollars = 234
let dollars = 234
//3.descriptive-not verbose
let mumcooking = ""


/// data s tructures
//1.numbers- integers,doubles
console.log("i am an integer", 4)
console.log("i am an double", 3.4)

//big ints numbers>2power53-1
//add an n after the big  number

const elon = 1000000000000000000000000000000000000000000n

//2.strings - inside "" or ''
console.log("hello you")
console.log("45")
console.log(typeof "45")
console.log(typeof 45)



//booleans - true or false
const isAuthenticated = true
const isAdmin = false
//isAuthenticated ? <ShowProfile/> : <ShowAuthPage/>
//undefined
let student;// must put an = sign to define
console.log(student)

//null - data is empty
const noData = { number: null }
console.log(noData.number)


//objects {}-empty object
let myData = {}
console.log(myData)
//to add  data  object  you  use . notation
myData.name = "emma"
myData.university = "nyeri"

console.log(myData)
console.log("myData is an ", typeof myData)


//ARRAYS
//[]
let isMarried = false
const info = ["Pauline wangui", 22, "DEKUT", { IDNUMBER: 2345656, NATIONALITY: "KENYAN" }, isMarried]

//why is an array an object?
console.log(info)
console.log("info is an ", typeof info)


//typecoercion-string concatinated to a number becomes a string
//string concatinated to a number becomes a string

console.log(typeof ("5" + 3));
console.log("5" + 3);

console.log(typeof (5 + "3"));
console.log(5 + "3");

console.log("5" - 3);

//change  string   to number 
console.log(Number("56"))
console.log(typeof Number("56"))

console.log(parseInt('56'))
console.log(typeof parseInt('56'))



//number to string

let num = 56
console.log(num.toString())

Console.log(typeof num.toString())