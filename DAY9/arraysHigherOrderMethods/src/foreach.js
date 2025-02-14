//used  to execute a  provided  function once
//iterates through each elements in array and performs
//no returnvalue
//it is mutable -modifies  original array
//arrayName.foreach(callbackfn, thisArg);
//callbackfn -(value)=>{}//without return
//callbackfn -(value)=>{ return value}//with return
//callbackfn -(value)=>(value)//with return directly

let runners = ['kiplimo', 'kiprotich','koskei']
runners.forEach((runner)=>{
    //ITErates over  each element and performs  a given operation
    console.log(`${runner} runs 10km race`)

})
//access each element
//kiplimo  runs 1okm
//kipkoech  runs 1okm
//koskei  runs 1okm


let marks = [34,56,7,77]
const average =marks.forEach((singleMark) =>{
    let total =0
    total += singleMark //total =total + singleMark
    console.log(total)
})
console.log(average)