//the code is working  but it is leading to unreadable codes
//this leads  to call back hell pyramig
//too solve  this problem  of callbacks we ue promises

//a promise can be in three state
//pending , initial state, neithrt fulfilled nor  rejected
//fulfilled
//rejects

let promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  if (Promise.resolve) {
    resolve('Success message'); // Resolve with a success message
    message
  } else {
    reject('Error message'); // Reject with an error message
  }
});
console.log(promise)

///Once a Promise is created, it needs to be consumed to handle the result of the asynchronous operation. Consuming a Promise is done using the .then() and .catch() methods, which allow you to define how to handle success and failure, respectively.

promise.then((result) => {//.then used  to resolve
  console.log(result)

}).catch((error) => {
  console.log(error)
})


//function loginUser(email, password,callbackfn){
// setTimeout(()=> {
// console.log(`logging in`);
//callbackfn({userEmail: email,userPassword:password});
//After 3 seconds, console.log("logging in") printsv
//},3000);
//}

function loginUser(email, password,) {
  //return a new promise  instead of callbackhas a new resolve,rejects
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`logging in`);
      resolve({ userEmail: email, userPassword: password });
      //After 3 seconds, console.log("logging in") printsv
    }, 3000);

  })

}




function getAllVideos({userEmail}){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log(`we have recently watched these videos`);
      const videosInfo =["stars",'the mando','lord of wrings']
      resolve({userEmail,videosInfo});
  

    },3000);
    
  })
 
}








//get details of one video 
function getVideoInfo(videosInfoObj) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`We have the details of one vifeo`)
      resolve({ video: videosInfoObj.videosInfo[1] }) //The Mando
      console.log(videosInfoObj.videosInfo[1])
    }, 3000)
  })

}

loginUser("jay@dugff.com", "234453475786").then((userObj) =>getAllVideos(userObj).then((videosObj) =>getVideoInfo(videosObj)) )