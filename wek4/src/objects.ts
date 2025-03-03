//how to define an object literal in typescript
{ }

const person = {
    name: 'ALice',
    age: 30
}

/**const person :{
    name:string;
    age:number;
}**/ //by default  ts infers object


//explicit  type annotation
const person1: { name: string, age: number } = {
    name: 'ALice',
    age: 30

}


//using type to define objects shapes
//the type keyword  allows you to define  the shape of an object   this is useful when you need  to use the saem







//interfaces
///interfaces are other ways   of constructing objects .they are similar  to types  but have more  capabilities like extending from other interfaces

//syntax - there is no equal sign  in interfaces

interface Animal {
    name: string;
    age: number;

}
//we can extend the properties of an interface and use them in another  interface

interface Dog extends Animal {
    breed: string;

}

const myDog: Dog = {
    name: 'Rex',
    age: 2,
    breed: 'german'

}


//interfaces can be extendes types cannot be extended
//9intersection

type A_ = {
    propA: string;

}

type B_ = A_ & {
    propB: number;

}


//akey of an object is always astring andis always positioned at ana index

//const syntax:{[key: string]:string}


const dynamicKeyShape: { [key: string]: string } = {}
dynamicKeyShape['name'] = 'john'

dynamicKeyShape['age'] = "30"



//example of dynamic  keys with fixed properties

type User = {
    id: number
    name: string;
    //this accepts  a key name  of any name  that can  be either  a string  or a number
    [key: string]: string | number
}
// there will be no error if you  dont   pass in a dynamic key declared

const user1: User = {
    id: 1,
    name: 'john',
    email: "yuuu$@su",
    phone: 122222
}
console.log(user1)


//utility types

//typescript provides utility functions  to make it easier to work with typescrirt
//partial makes all  properties of an object  required
//pick creates a new type  by picking  a set  of properties  from an existing type
//omit creates a new type  by ommiting  a set of properties  from an existing type


type Person1 = {
    name: string;
    age: number;
    location: string;


};

type PartialPerson = Partial<Person1>;
type RequiredPerson = Required<Person1>;


//const partialPerson :PartialPerson ={
// name :"ALICE"
//}

//const requiredPerson :RequiredPersonPerson ={
///name :"BOB",
//}



type Person2 = {
    name: string;
    age: number;
    location: string;


};

type NameAndAge =Pick<Person2, "name"|"age">

const nameAndAge :NameAndAge = {
    name: "alice",
    age :30
}
//create name and age type by ommitting location

type withoutLocation = Omit<Person2,"location">

const withoutLocatione :withoutLocation = {
    name: "alice",
    age :30
};


//interfaces support declaration merging which allows  you to extend  an interface  by decalring  it multiple times

interface person3{
    name: string

}

interface person3{
    age: number;


}


//types assertion and casting
//you can  explicity  tell typescript the type of an object using type  assertions

const someValues :unknown ="hey you"
const strLength: number =(someValues as string).length
console.log(strLength)

const  fullName ={
    name :'jey'

} as {name :string}