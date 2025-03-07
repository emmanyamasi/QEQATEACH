//conditions are basically an if statement that evaluates to true

let showering = true
if(showering){
  console.log('yOU are a good boy')
}

//if the condition was not satisified - there is a fallback  with an else statement

let heshowering = false
if(heshowering){
  console.log('yOU are a good boy')
}else{
  console.log('you are a bad boy')
}

//in some situations you can have multiplr falsebacks
//else-if, else if , else
let marks =0
let grade = ''
function myGrade (mark){
  if (mark >89){
    grade ='A'

  }else if(mark>70){
    grade = 'B'

  }else if(mark >50){
    grade = 'C'
  }else if(mark >30){
    grade = 'D'
  }else{
    grade = 'E'
  }
  //FUNctions have to have a return value
  return grade
}
console.log(`Your grade is : ${myGrade(78)}`)



//es6
//let functionName = condition ? executeThis1: (else) executeThis2


const myGrade1 = (mark) =>{
  if (mark > 100 || mark <0){
    return "invalid";
  }
  return mark >70? 'A': //else if
         mark >= 70 ? 'B'://else if
         mark >=50 ? 'C'://else if
         mark >=30 ? 'D'://else if
         'E';
        `Invalid  input marks` //else block


}
console.log(myGrade1(101));

