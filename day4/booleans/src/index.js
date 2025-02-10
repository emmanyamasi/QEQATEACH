//a boolean  is atrue or false  value
//npmi
const isAdmin  = true
const isStudent = false
//logicayy   how can we apply  booleans

function showPaymentModule(args){
    //this can be  an angular/react component
    if(args === true){
        //SHOW PAYMENT DETAILS
        console.log("you have  the access rights  to payaments page")
//show PagenOTAUTHORIZED
    }else{
        console.log("you dont have  the access rights  to payaments page")

    }

}
//{isAdmin && <PaymentsPage/>}

showPaymentModule(isAdmin)
showPaymentModule(isStudent)


//IF you wrap true or flae in quotes they become strings

console.log(typeof 'true')


//boolean context
//are  often  used in the context  of  comparision and logical operators
//equality  opertor (==): returns  true  if  the operands are equal
// use == or ===
//== - checks if the values are equal only
//=== - checks  if the values  are equal and  the  type  are  equal

console.log(5 == '5')//true
console.log(5 === '5') //false - better checking both values  and types number! = string

//booleans can also be used  to check  inequality
//we use != or !==
//!= checks value
//!== checks value and type - better

console.log(6 != 6) //false
console.log(6 !== 6)//false
console.log(6 != '6')//false
console.log(6 !== '6')//true- checks  the type and value


//real world example of ! = comparision  using passwords

// import bcrypt from 'bcrypt
//const password  ='2344t5rd'
//const hashedPassword = bcrypt .hashSyc(password, 10)
//console.log(hashedPassword)

//assuming  that u need  to login to your app
// we need  to compare  the user  password with the hashed password
//const comparedPasswords = bcrypt.compareSync("password",hashedPassword)
//const comparedPasswords = bcrypt.compareSync("password",hashedPassword) false

//&&keyword

//its a logiCAL  operator  that checks  if the left and  right side  are true

console.log(true && true) //true
console.log(true && false) //false
console.log(false && true) //false






