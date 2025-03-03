console.log("Hello, TypeScript!");

console.log("Hello, TypeScript!");
const logAlbumInfo =(
    title :string,
    trackCount : number,
    isReleased : number,
) =>{
    
    console.log(`Title: ${title}`);
};

logAlbumInfo("black",23,12);




//Exercise 1: Basic Types with Function Parameters

export const add = (a: number, b: number) => {
    return a + b;

  };

const result = add(1,2);

