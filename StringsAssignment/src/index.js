console.log("hey you");

//1. check stringinput
function is_string(input){
    return  typeof input ==='string';
}
console.log(is_string('w3resource')); //true
console.log(is_string([1,2,3,4]));//false


//2. check blank string

function is_Blank(input){
    if(input.length ===0){
        return true;
      }
    else{
        return false;
    }
}
console.log(is_Blank(''));//true
console.log(is_Blank('abc')); //false


//3.string to array of words
//write a javascript  function  tosplit  a string  to convert it into an array
//SPLIT - splits an object into an array
function string_to_array(str){
    return str.split('');

}
console.log(string_to_array("Robin Singh"));


//4.extract characters
//Write a JavaScript function to extract a specified number of characters from a 
//string. 

function truncate_string(str, num){
    return str.substring(0,num)
}
console.log(truncate_string("Robin Singh",4)) //robi

///5. abbreviate name
//Write a JavaScript function to convert a string into abbreviated form. 


function abbrev_name(name) {
    let nameParts = name.split(" ");
    if (nameParts.length > 1) {
        return `${nameParts[0]} ${nameParts[1][0]}.`; //accesses the first letter of second name
    }
    return name; // Return the name as is if there's no space
}

// Test case
console.log(abbrev_name("Robin Singh")); // "Robin S."


//6. write a javascript function  that hides email addresese to prevent  unautharized access
function protect_email(user_email){
    let [user, domain] = user_email.split('@');
    let hiddenUser = user.substring(0,5) + "..."///everythinh after the name robin is hidden
    return `${hiddenUser}@${domain}`;


}
console.log(protect_email("robin_singh@example.com"));


//7.parametize string
//write a javascript  functionn  to  parametize a string
function string_parametize(str) {
    return str.trim().toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/g, "") // Remove special characters
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

// Test case
console.log(string_parametize("Robin Singh from USA.")); // "robin-singh-from-usa"
  
//8.captitalize first letter
//write a javascript function  to capitalize the first letter of a string
function capitalize(str){
    return str.charAt(0).toUpperCase() +str.slice(1); //Keeps the rest of the string unchanged.
}
console.log(capitalize('js string exercises')); // "Js string exercises"


// 9.write a  javascript function  to capitalize each word in a  string
function capitalize_Words(str){
    return  str.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalize_Words('js string exercises')); // "Js String Exercises"



//10.Write a JavaScript function that converts uppercase letters to lowercase and vice 
//versa ina  agiven string
function swapcase(str){
    return str.split("")
    .map(char => char ===char.toUpperCase()
    ?char.toLowerCase()
    :char.toUpperCase())
    .join("");

    
}
console.log(swapcase('AaBbc')); // "aAbBC" 



//11.Write a JavaScript function to convert a string into camel case. 
function camelize(str){
    return str.replace(/\W+(.)/g, function(match,chr){
        return chr.toUpperCase();
    }
);
}
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises" 


//12. Uncamelize String 
// Write a JavaScript function to uncamelize a string.

function uncamelize(str, separator){

    if(typeof(separator) == "undefined"){
        separator = " ";
    }
    var str = str.replace(/[A-Z]/g, function (letter)
    {
        return separator +letter.toLowerCase();
    });
    return str.replace("/^" + separator + "/", '');


}
console.log(uncamelize('helloWorld','-'));



//13. Repeat String 
//Write a JavaScript function to concatenate a given string n times. 
function repeat(str, n) {
    let result = '';
    for (let i = 0; i < n; i++) {
      result += str;
    }
    return result;
  }
  
  // Test data
console.log(repeat('Ha!', 3)); // Output: "Ha!Ha!Ha!"


// 14. Insert in String ///Write a JavaScript function to insert a string within another string at a given 
//position. 
 function insert(main_string,ins_string,pos){
    if(typeof(pos) === "undefined"){
        pos =0;
    }
    if(typeof(ins_string) === "undefined"){
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string +main_string.slice(pos);

 }
 console.log(insert('We are doing some exercises.', 'Javascript',18));



///15. Humanize Format 
//Write a JavaScript function that formats a number with the correct suffix (1st, 2nd, etc.). 

function humanize_format(num) {
    let suffix = ['th', 'st', 'nd', 'rd'];
    let remainder = num % 10;
  
    // Handle special cases for 11th, 12th, 13th, etc.
    if (num >= 11 && num <= 13) {
      return num + 'th';
    }
  
    // Return the number with the appropriate suffix
    return num + (suffix[(remainder - 1)] || suffix[0]);
  }
  
  // Test data
  console.log(humanize_format(301));  // Output: "301st"
  


//16. Truncate String with Ellipsis Write a JavaScript function to truncate a string and append "...".

function text_truncate(str, length, ending = '...') {
    // Check if the string length exceeds the specified limit
    if (str.length > length) {
      return str.substring(0, length) + ending;
    }
    return str;
  }
  
  // Test data
  console.log(text_truncate('We are doing JS string exercises.', 13, '!!'));  // Output: "We are doing !!"
  

 // 17. Chop String into Chunks ○ Write a JavaScript function to chop a string into chunks. 


 function string_chop(str, size) {
    if (size <= 0) return []; // Handle invalid chunk size
    let chunks = [];
    for (let i = 0; i < str.length; i += size) {
      chunks.push(str.substring(i, i + size));
    }
    return chunks;
  }
  
  // Test cases
console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"] 



//8. Count Substring Occurrences Write a JavaScript function to count occurrences of a substring in a string.
function count(str, subStr) {
    let regex = new RegExp(subStr, "gi"); // Case-insensitive global match
    let matches = str.match(regex);
    return matches ? matches.length : 0;
  }
  
  // Test Data
  console.log(count("The quick brown fox jumps over the lazy dog", "the")); // Output: 2
  

//19Reverse Binary RepresentationWrite a JavaScript function that reverses the binary representation of a number and returns its decimal form.

function reverse_binary(num) {
    let binary = num.toString(2);  // Convert number to binary string
    let reversedBinary = binary.split('').reverse().join('');  // Reverse the binary string
    return parseInt(reversedBinary, 2);  // Convert back to decimal
  }
  
  // Test Data
  console.log(reverse_binary(100)); // Output: 19
  

//20. Pad String to Length  Write a JavaScript function to pad a string to a specified length. 

function formatted_string(pad, num, direction) {
    let str = num.toString();
    return direction === 'l' 
      ? pad.slice(0, pad.length - str.length) + str // Pad on the left
      : str + pad.slice(0, pad.length - str.length); // Pad on the right
  }
  
  // Test Data
  console.log(formatted_string('0000', 123, 'l')); // Output: "0123"

  