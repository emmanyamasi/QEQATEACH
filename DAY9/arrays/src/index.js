const  name = 'Emma' //single string value
const  number = 23 //single  number value
const countryInfo ={name : 'KEnya', county: 'Nyeri'} //a string  value

const info =  [name,number, countryInfo]//colllection of different values

console.log(info)

///acccessing array indices
const mark =[12,56,53,66];
//access modifiers in arrays -passed by reference
//arrayName[indexPosition]
console.log(mark[0]); //12
//arrays -passed by reference not by value
const fullname =['Ali','Green']
fullname[0]='Mimi'
console.log(fullname[0])




//modifications in arrays
//arrayName [indexPosition]= value
const marks = [21,45,67]
let marksAtIndex2 = marks[2]
marksAtIndex2=80
console.log(marksAtIndex2) //80


///adding elements to an arrays
//.push -used to add elementts at the end of an array
let dennisInfo = []
dennisInfo.push(23)
console.log(`Dennis info : ${dennisInfo}`)
dennisInfo.push({idNumber:3567829,county :"Nyeri"})

//.pop is amethod  that removes
console.log(dennisInfo.pop())


//shift = used  to remove first element

console.log(dennisInfo.shift()) //23
const cowInfo = ['Fresian', 'Brown',150]
//an indexof()expects  you to  pass in anindex
console.log(cowInfo.indexOf())
console.log(cowInfo.indexOf("Fresian"))


//joining arrays
//concat -
//firstArrayName.concat(seconArray)

const markMwangi =['Mark', 636782910]
const stanley =['stanley', 636782910]

const combinedArrays = markMwangi.concat(stanley)
console.log(combinedArrays)


//joining  array elements  to into one string  use join()
const months =['jan','feb','march']
console.log(months.join()) //jan,feb,march

console.log(months.join('')) //janfebmarch no space

console.log(months.join(' ')) //jan feb march-adding space


//.reverse-used to reverse the array elements

console.log(['c','o','w'].reverse())


//palindrome
console.log('dad' == 'dad'.split('').reverse().join('')); // true

//splice to remove replace or add elements in an array
const siz  =['mimi','nelly','perl'];
//at index 1 replace zero value
//add fatma at index 1
siz.splice(1,0,'fatma')
console.log(siz) //adds fatma
//[ 'mimi', 'fatma', 'nelly', 'perl' ]


//at index1 remove 2 items and replace  with najma and jane
siz.splice(1,2,'najma','jane');
console.log(siz)//removes nelly
//[ 'mimi', 'najma', 'jane', 'perl' ]



console.log(siz.splice(1))//removes first item
//[ 'najma', 'jane', 'perl' ]


//slice
//used to create a shallow copy of a portion of an array
//slice will return  an array from  the starting index  to  indexprovided minus one

const broz =['mark','Allan','ian','ken'];
console.log(broz.slice(1,3))
