//
function getFirstElement<T>(args: T[]) {

    return args[0]

}

const firstNumber = [1,2,3]
const strings =['apple','mango','orange']

console.log(getFirstElement(firstNumber))
 

//using  generics with functions 
//single  generic  parameter

function reverseArray<T>(arr:T[]){
    return arr.reverse()


}

const numArr = [123,44,4]
console.log(reverseArray(numArr));


//multiple generic parameters


function mergeObjects<T, U>(obj1:T,obj2:U){
    return {...obj1,...obj2}
}

const objA = {NAME:'JOHN',age:33}
const objB = {COUNTRY:'KENYA',COUNTY:'BOMET'}
console.log(mergeObjects(objA,objB));



//generic constrainnts
//you can limit  the types  that can  be passed as a generic parameter



function getProperty<T,K extends keyof T> (obj:T,key:K){
    return obj[key]


}

const person  = {name1:'lili',age:3}
const name1 = getProperty(person,"name1")
console.log(name1);


//default types for generics

function createPair<T=string, U= number>(value1:T,value2:U):(T|U)[]{
    return[value1,value2]
}
console.log(createPair('hey',22));
///the default parameters will be overwritten
console.log(createPair(100,true));

//generics with interfaces and types


interface KeyValuePairs<K,V>{
    key:K;
    value: V;

}

const numPairs : KeyValuePairs< string, number> ={
    key:'id',
    value:123
}


//we want  to create a generic type
type Result <T> = {
    success: boolean;
    data :T;
    error? :string
}

const  successResponse :Result<string>={
    success :true,
    data : 'Operation was suceess',

}

type isString<T> = T extends string? 'YES':'NO'


