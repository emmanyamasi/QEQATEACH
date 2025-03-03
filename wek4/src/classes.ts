console.log('hey you');
//allow encaspulation
//creating a class in ts
//use  the class keyword and classname
/**class StudentMarks {
    name :string;
    marks : number[];

}**/

//  name and marks a re not initialized to fix this we need to  add  a initializer*//

//2.adding a constructor-is a special method  that runs when a new instance  of  the class is created it is used  to initialize  the object properties


class StudentMarks {
    name: string;
    marks: number[];
    ///add a constructor
    constructor() {
        //initialize  the properties

        this.name = "kenny"
        this.marks = [21, 23, 22]

    }
}
// when we create an instance of  student marks the properties will be initializes
const LoopMarks = new StudentMarks()
console.log(LoopMarks); //StudentMarks { name: 'kenny', marks: [ 21, 23, 22 ] 

//ADDING ARGUMENTS TO A CONSTRUCTOR

//
interface AlbumOptions {
    t: string;
    ar: string;
    releaseYear: number;
}

class Album {
    t: string;
    ar: string;
    releaseYear: number;

    constructor(opts: AlbumOptions) { // Corrected parameter type
        this.t = opts.t;
        this.ar = opts.ar;
        this.releaseYear = opts.releaseYear; // Corrected property assignment
    }
}


const myAlbum = new Album({
    t: "Thriller",
    ar: "Michael Jackson",
    releaseYear: 1982,
});

console.log(myAlbum.t); // Output: Thriller



//readonly properties
class Album4 {
    readonly t: string;
    readonly ar: string;
    readonly releaseYear: number;

    constructor(opts: AlbumOptions) { // Corrected parameter type
        this.t = opts.t;
        this.ar = opts.ar;
        this.releaseYear = opts.releaseYear; // Corrected property assignment
    }
}



//optional Properties

class Album5 {
    t?: string;
    ar?: string;
    releaseYear?: number;



}


//visibility  modifiers
//public :default accessible  from  anywhere
// private : accessible only within the class
//protected 
class AlbumSubclass{}
class Album6 {
    public t?: string;
    public rating?: number;
    protected art?: string;

    //subclass


}


class Album7 {
    t: string;
    ar: string;
    releaseYear: number;

    constructor(opts: AlbumOptions) { // Corrected parameter type
        this.t = opts.t;
        this.ar = opts.ar;
        this.releaseYear = opts.releaseYear; // Corrected property assignment
    }

    //create methods
    public printInfo(){
        console.log(`${this.t}by${this.ar} released ${this.releaseYear}`);
        

    }
}

const album = new Album7({
    t: "Thriller",
    ar: "Michael Jackson",
    releaseYear: 1982,
});

album.printInfo()



//inheritance
//classes can inherit  properties  and methods from other classes  using thr extends  keywword

class SpecialEditionAlbum extends Album7 {
    bonusTracks : string[]
    constructor(opts: {title:string; artist:string;releaseYear:number; bonusTracks:string[] })
    {
        super(opts)
        this.bonusTracks = opts.bonusTracks
    }

}
//the super  method 

//getttrs an setters - allows you to access and modify an object property 
