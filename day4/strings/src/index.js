let myname  = "" //empty string
let myBook = "Introduction to javascript"
let statement = `i love to code`
let laptopType  ='LENOVO'//SINGLE QUOTE


//stirng properties
//1.length - returns  the number  number  of characters in  a string
let name  = 'ALICE'
console.log(name.length) ///5

//2.charAt() returns  the character  at the specified index in a string
// S H A K I R A
//0  1 2 3 4 5 6

let fname  = 'shakira'
console.log(fname.charAt(3))//k

//3.concat  - concatinates  or joins  two strings
let firstname =  'Julia'
let secondname =  'Mwangi'
console.log(firstname.concat(secondname))
console.log(firstname.concat(' '+ secondname))//ES5- adding space

console.log(firstname.concat(' '+ "MALIK"))//ES5
console.log(firstname.concat(`${secondname}`))//es6
console.log(firstname.concat(` ${secondname}`))//es6 spacing
console.log(firstname.concat(` MALIK`))//ES6



//4. INDEXOF -returns index of  thefirst occurence of a specified value in  a string

//I am a student
//0123456789....
const  lname = "Ann Kipkoech keio"
console.log(lname.indexOf("K"))//4

//INcludes -returns true if a string contains  a specified value
console.log(lname.includes('keio')) //TRUE
console.log(lname.includes('Keio'))//FALSE


//toLowerCase()- converts  sttring to lowercase letters
console.log("ELEPHANT".toLowerCase()) //elephant
let animalName = "ELEPHANT"
console.log(animalName.toLowerCase()) ////elephant



//toUpperCase()- converts  sttring to uppercase letters
console.log("elephant".toUpperCase()) //ELEPHANT

console.log(animalName.toUpperCase())//ELEPHANT

//SPLIT - splits an object into an array
//QUE - REVERSE WORD MONEY- COMBINE
// "money".split("").reverse()

console.log("wendani".split())
console.log("wendani".split(" ")) // no difference
console.log("wendani".split(""))//spaces



//substring - extracts characters from a string between 2 specified indices
//substring(startingIndex, endingIndex-1)

let sentence = "I am a student"
console.log(sentence.substring(7,11)) //stud



//substr- extracts parts of a string
//beginningat the character of the specified position
//and returns the specified number of characters
//substr(startingIndex,numberofcharacters)
console.log(sentence.substr(7,4)) //from 7 index return 4 characters 

let sentence1 = "HELLOWZ my name is JUMA"
console.log(sentence1.substr(2,5)) //lowz


//trim - removes white spaces from bothends of a string
let sent = '   Hi am  available   '
console.log(sent) //  Hi am  available

console.log(sent.trim()) //Hi am  available
console.log(sent.trimStart()) //remove white spaces on start only















