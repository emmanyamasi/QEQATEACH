// asynchronous  is nonblocking- one function has to be executed before  the other one 



function connectDB(){
    //CODE FOR CONNECTING TO THE DB

}

function fetchData(){
    connectDB(mongoDBInstance)
    //fetching data
}

//asynchronous  is non blocking codes let other  operations run while whaiting for a task to complete e.g you can fetch  data   from a server  without  freezing  the rest of application
async function connectDB(db){
    //code  for connecting to db
    // do exceptions  handlings
    //noNetworks , DB deleted
    await connectURL
}


async function fetchData(){
    //fetching data
    await connectDB(mongoDBInstance)

}

//you can handle asynchronous operations using
//1.callbacks
//2.promises
//3. async/await    