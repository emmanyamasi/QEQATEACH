//anything that holds data is is d atastructure
//objects - collection of keys and values
//an object can be created using {}
//on an object you add commas after every pair of key-value
//{key2: value1, key2:value2}

//empty object
const myObject = {}
console.log(typeof(myObject))



//how to add data  to an object
//using . notation
//objectName.key =value
myObject.firstName ="Emma"
myObject.secondName = "Askari" //string
myObject.age = 21 //number
myObject.marks = [34,34,56] //array
myObject.info = {idNum: 48930, country: "KENYA"};//OBJECT
console.log(myObject)



//objects can contain different types of datatypes

const Bruno = {
  fname: 'Bruno',//string
  age : 24, //number
  marks : [45,67,46], //arrays
  govInfo :{
    idNumber : 6789,
    location :"Nyeri"

  },// object
  meanGrade : function(meanGrade){
    return meanGrade
  }

}

console.log(Bruno)



//access modifies in ObJECTS

//DOT NOTATION
//syntax - objectName.keyName
console.log(Bruno.age)

//INDEX  STRING TYPES
//pass in a key as a string inside  []
//objectName["keyname"]
console.log(Bruno['fname'])
console.log(Bruno['age'])



// USING OBJECT KEYS
//static method returns an array of a given objects own enumerable string-keyed properties  names
//Object.keys(objectName) -----> returns  all keys as  strings
console.log(Object.keys(Bruno)) //[ 'fname', 'age', 'marks', 'govInfo', 'meanGrade' ]
//lets access the age key

let arrayKeys  = Object.keys(Bruno)
console.log(arrayKeys[1]) //age
//once we get  the key  we need  can use  the string  key type to access value
console.log(Bruno[arrayKeys[1]])


//ObjectName
console.log(Bruno[Object.keys(Bruno)[1]])//





//DESTRUCTURING



//USING  THIS KEY WORD -this keyword is used to refer to current context
const myInfo = {
  name: 'Emmanuel',
  age :30,
  hobbies : ['Reading','writing'],
  isMarried : false,
  meanGrade : function grades(){
    return "Your mean grade" + this.meanGrade
  },

  keyFn : function(n){
    return this[Object.keys(this)[n]]
  }

}
console.log(myInfo.keyFn(1))



//parse json
const json = {}