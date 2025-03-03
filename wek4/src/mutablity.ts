//state should not  be changed


//let  isAdmin = true
//isAdmin = false
//(prevState)=> (newState)
//prevState !=  newState
// muatbility  refers to ability  of a value  to be changed after it has been  created


//primitive types are immutable - string,numbers,boolean, null, undefined-cant change them once created



let str = "Hello"
console.log(str.toUpperCase());
console.log(str);


//objects and arrays are mutable

const arr:number[]=[1,2,3,4]
arr.push(6)
console.log(arr);


//object
const obj = {name: "Alice", age:40}
obj.age =44
console.log(obj);

//readonly makes objects immutable or  utility like ReadOnly<T>

type User2 ={
    readonly name:string;
    age: number;

}
 
const user :User2 ={ name :"nini", age:3}
//user.name = "keen" read only
user.age =33// age is not read only

const readonlyObj :Readonly<User2> = {name :"lily",age:33}
//readonlyObj.age =33 cannot since it is readonly property




type User3 ={
    name:string;
    age: number;

}

const readonlyObj1 :Readonly<User3> = {
    name :"lily",
    age:33,
}


// how to pass types to functions
//basic way of passing types  to functions

function greet(name:string):string {
    return `hey ${name}`;

}
console.log(greet("geta"));

//generics in functions
//the type  of a generic  is unkown
//generics allows functions to  accept different types while  preserving  type safety
// function functioname<T>(args:T)
function identity<T>(value:T):T{
    return value
}
console.log(identity<string>("hello"));
console.log(identity<number>(13));
console.log(identity<{name:string, age:number}>({name:"hoeey",age:3}));

//passing mulitiple generics
function merge<T, U>(obj1:T,obj2:U):T & U{
    return{...obj1,...obj2}
}

const mergedObj = merge({name:"ted"},{age: 22})

 
console.log(mergedObj);


//arrays in typescript
//const arrName:type[]=[]
//const arrName:Array<type>= []

const fruits:Array<string> = ['apples','kiwis']
const marks : number[]= [2,2,3,4,4]



type userType ={
    uid:string;
    uName :string;
    isAdmin :boolean;
}


const data:userType ={

    uid:"43456",
    uName:'32433',
    isAdmin:false
}
const fetchData = async ():Promise<userType> =>{
    //const res = await fetch(apiURL)
    //const json =  await res.json()

    const user_data=await  data
    //how the backend  data struture  looks like determins the return type
    //for an array of objects
    //const fetchData  = async():Promise<userType[]>=>{}
    return user_data


}
fetchData().then((user) =>console.log(user))









//sets in typescript
//as set in js is a collection of unique values
//in ts it is  typed using SET<Type>

const mySet: Set<number> = new Set([1,2,3,4])
mySet.add(4)
console.log(mySet);

//creating  an empty set  with specific types
const emptySet = new Set<string>()
emptySet.add("hello")
console.log(emptySet);
console.log(mySet.has(3));




//type  assertions and casting

//use as syntax
const jsonString  ='{"name":"alice","age":30}';
const  parsedData = JSON.parse(jsonString) as {name:string; age:number}
console.log('parsed',parsedData);


//use angle brackets syntaz
const parsedData2 =<{name:string;age:number}>JSON.parse(jsonString)

//DEFULT
//rest parameters

const sum = (...numbers:number[]) =>{
    return numbers.reduce((prev,next)=>prev +next,0)
}

console.log(1,2,3,4,4,5,)//21

//void keyword - no return type
const logMsg = (message:string):void =>{
    console.log((message));



 
}

