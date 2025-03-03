//We can declare our own union types
const logId = (id: string | number) => {
    console.log(id)
}

//This means that logId can accept either a string or a number as an argument,

logId('abc')
logId(123)

//Union types also work when creating your own type aliases
type Id = number | string
function logId1(id: Id) {
    console.log(id)
}

//Union types can contain many different types
type AllSortsOfStuff =
    | string
    | number
    | boolean
    | object
    | null
    | {
        name: string
        age: number
    }


//Literal types can be used to represent strings, numbers, or booleans that have specific values.
type YesOrNo = 'yes' | 'no'
type statusCode = 200 | 33



//Combining Unions With Unions


type DigitalFormat = 'MP3' | 'FLAC'
type PhysicalFormat = 'LP' | 'CD' | 'CASSETEE'


type AlbumFormat = DigitalFormat | PhysicalFormat

const getAlbumFormat = (format: PhysicalFormat) => {

}
getAlbumFormat('CASSETEE')



//Exercise 1: string or null

type User1 = string | null;
function getUsername(username: User1) {
    if (username !== null) {
        return username

    } else {
        return 'guest'
    }

}

const result = getUsername("alICE")
const result1 = getUsername(null)



console.log(result);  // Output: "alICE"
console.log(result1);


//

//Exercise 2: Restricting Function Parameters


type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

function move(direction: Direction, distance: number) {
    console.log(`movin ${direction} ${distance}`);


}

move("UP", 10);



///NARROWING WITH TYPE OF
const getAlbumYear = (year: string | number | boolean) => {
    if (typeof year === 'string') {
        console.log(`the album was releases in ${year.toUpperCase()}`);

    }
    else if (typeof year === 'number') {
        console.log(`the album was releases in ${year.toFixed(0)}`);


    }
    console.log(year);

}

//
//Exercise 1: Narrowing with if Statements

function validateUsername(username: string | null): boolean {
    if (typeof username === 'string') {
        console.log(`username ${username.length}`);
        return true;

    } else {
        console.log("invalid");
        return false

    }


}
validateUsername('nelly') //length 5
validateUsername(null);







