//while  comparing values  the || and && come in handy in 
// we also use ==  or === for equality
let result  = '2' || '3' || "Alamin"

if(result == '2' ||  result == '3' ||result == "Alamin"){
    console.log('available')

}else{
    console.log('unavailable')
}
//if one side of an or condition is  true it will equate to true

//logical && - returns  true only if both operands are true
//if either are false it returns false

console.log(true && true)//true
console.log(true && false)//false
console.log(false && true)//false
console.log(false&& false)//false


let a =5 , b= 10;
console.log(a<b && b>a)//true
console.log(a>b && b>a)//false

//data sctructures contains keys- index and values - object
let user  = {isLoggedIn: true, hasPermission: true}
// to view bankbalanceone needs to be loggedin and have permission
if(user.isLoggedIn && user.hasPermission){
    console.log("view your bank balance")
}

//returns true if atleast one side is true 
//only when one all sides are false it returns false
let result1  = '2' || '3' || "Alamin"

if(result1 == '2' ||  result == '5' ||result == "Alamin"){
    console.log('available')

}else{
    console.log('unavailable')
}


console.log(a<b || b>a)//true one condition is true
console.log(a>b || b<a)// both conditions are false
let userName = ''
let displayName = userName || 'Guest' // print either empty or guest
console.log(displayName)



//the  logical not! checks the opposite  of equation
console.log(!true)//false
console.log(!false)//true


let isActive = false
if(!isActive){
    console.log("the system  is not active")
}else{
    console.log("the  system  is  active")

}

//order of operations  (! has higher precedence  than &&)
let _a = true;
let _b  = false;
let _result  = !_a && (!_b || true);
console.log(_result);//false


//in react we use logical rrendering  using logical operators
return{
    
}