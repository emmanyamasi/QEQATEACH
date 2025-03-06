//done using for loop,while loop, for in
// while loop

//executes a block of code as long as its is true - while condition is true execute a 
//while(condition){
    //code to be executed
//}
let x =0
while(x<10){
    console.log(x)
    x++
}
console.log("the program  has been stopped")

//do .. while loop - guarantees  the execution of code before it is tested
//do{
    //do this
//}while (condition)

//let  actualPassword  ="pass$$w0rd";
//let myInputPassword;
//do{
    //let PasswordInputValue  = prompt("Enter a passoword")
    //myInputPassword = PasswordInputValue;
//}while (myInputPassword !== actualPassword);
//alert("Correct Password"); //the user will be prompted to enter the password as long as  the password does not match the actual password


//for loop
const marks  = [12,45,34,56,78,79]
console.log('the length  of the array  is', marks.length);
for (let index =0; index<marks.length;index++){
    console.log(marks[index]);
    if(index >=5){
        console.log('the  program will break  if index is greater or equal to 5\n');
        break;//exits the loop if index  is 5 or more
    }
}







//for of loop - used  to iterate  over iterable
//const languages = ["Javascript", "Python", "HTML"]
  //for(let  lang of languages){
   // console.log(`${lang}\n)}




//for in loop - used to interate  over emu

const myInfo = {
    name : "Emma",
    age :21,
    bankBalance : "12 bob",

    info: () =>{
        const info ={
            idNumber : 87904587493,
            country : "Kenya"
        }
        return `idNumber: ${info.idNumber} country  `
    }
}


