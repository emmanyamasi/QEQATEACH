"use strict";
//We can declare our own union types
const logId = (id) => {
    console.log(id);
};
//This means that logId can accept either a string or a number as an argument,
logId('abc');
logId(123);
function logId1(id) {
    console.log(id);
}
const getAlbumFormat = (format) => {
};
getAlbumFormat('CASSETEE');
function getUsername(username) {
    if (username !== null) {
        return username;
    }
    else {
        return 'guest';
    }
}
const result = getUsername("alICE");
const result1 = getUsername(null);
console.log(result); // Output: "alICE"
console.log(result1);
function move(direction, distance) {
    console.log(`movin ${direction} ${distance}`);
}
move("UP", 10);
///NARROWING WITH TYPE OF
const getAlbumYear = (year) => {
    if (typeof year === 'string') {
        console.log(`the album was releases in ${year.toUpperCase()}`);
    }
    else if (typeof year === 'number') {
        console.log(`the album was releases in ${year.toFixed(0)}`);
    }
    console.log(year);
};
//
//Exercise 1: Narrowing with if Statements
function validateUsername(username) {
    if (typeof username === 'string') {
        console.log(`username ${username.length}`);
        return true;
    }
    else {
        console.log("invalid");
        return false;
    }
}
validateUsername('nelly'); //length 5
validateUsername(null);
//
//Exercise 2: Throwing Errors to Narrow
//# sourceMappingURL=unionliterals.js.map