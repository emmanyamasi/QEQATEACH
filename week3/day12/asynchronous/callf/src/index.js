function greet(name, callback) {
  console.log(`hello ${name}`); // Corrected this line
  callback();
}

function sayGoodbye() {
  console.log("goodbye");
}

// Calling the function
greet("emma", sayGoodbye);


//A callback function is a function that is passed as an argument to another function and executed after some asynchronous operation completes. Your code mimics a real-world asynchronous flow:

//Logging in the user
//Fetching recently watched videos
//Fetching details of one video

//login
function loginUser(email, password,callbackfn){
  setTimeout(()=> {
    console.log(`logging in`);
    callbackfn({userEmail: email,userPassword:password});
//After 3 seconds, console.log("logging in") printsv
  },3000);
}



//getallvideos
function getAllVideos({userEmail},callbackfn){
  setTimeout(()=>{
    console.log(`we have recently watched these videos`);
    callbackfn({userEmail,videosInfo:["stars",'the mando','lord of wrings']});


  },3000);
}

///It takes { userEmail } as an argument.
//After 3 seconds, it logs "we have all recently watched videos".
//It calls the callback function, passing { userEmail, videosInfo }.

// Function: getVideoInfo(videosInfoObj, callbackfn)

//This function fetches details of one video.

function getVideoInfo(videosInfoObj,callbackfn){
  setTimeout(()=>{
    console.log(`we have details of this video`);
    callbackfn({video:videosInfoObj.videosInfo[1]});

  }, 3000);
}


///akes videosInfoObj (the list of videos).
//Waits 3 seconds.
//Logs "we have details of one video".
//Calls the callback function with video: videosInfoObj.videosInfo[1] (selecting "the MANDO").


//execution

loginUser("jay@dugff.com", "234453475786", (userObj) => {
  console.log(userObj); // Logs: { userEmail: 'jay@dugff.com', userPassowrd: '234453475786' }

  getAllVideos(userObj, (videoDetailsObj) => {
    console.log(videoDetailsObj); // Logs: { userEmail, videosInfo: ["stars", "the mANDO", "LORDOF RINGS"] }

    getVideoInfo(videoDetailsObj, (videos) => {
      console.log(videos); // Logs: { video: "the mANDO" }
    });

  });
});
