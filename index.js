import { Accelerometer } from "accelerometer";
import clock from "clock"
import { preferences } from "user-settings";
import * as util from "../common/utils";
import document from "document";

let accel = new Accelerometer({ frequency: 1});
accel.onreading = function() {
  console.log("ts: ", accel.timestamp, "x: ", accel.x, "y: ", accel.y, "z: " , accel.z);
}
accel.start();

var backgrounds = ["bay.png", "bridge.png", "dunes.png", "genoa.png", "road.png"];

var person1 = { title: "situps.", descrption: "go and walk to a sink or water fountain", time: "2-5 minutes", picture: "water.jpg" };
var person2 = { title: "toe touches.", descrption: "see video on website", time: "2-5 minutes" };
var person3 = { title: "high knees.", descrption: "see video on website", time: "2-5 minutes" };
var person4 = { title: "stair sprints.", descrption: "", time: "" };
var person5 = { title: "jumping jacks.", descrption: "you know how to do it", time: "3-5 minutes" };
var person6 = { title: "burpees.", description: "pain", time: "forever"};
var person7 = { title: "high jumps.", description: "not that bad", time: "3- 5 minutes"};
var person8 = { title: "squats.", description: "pain", time : "3-5 mintues"};

var workOuts = [person1, person2, person3, person4, person5, person6, person7, person8];

var picCount = 0;
var d = new Date();

//var trueRan = d.getTime() % 5;
var background = document.getElementById("groundBack");
var count = 0;
var pauseCount = 0; //establishes the amount of time to wait and show work out
var aa = 0;
var randomHelper = 234;
var trueRan = 0;
var previousTruRan = 0;
var next = 0;
var myLable = document.getElementById("myLabel");
var mustPause = false;
var totalChange= 0;
 function getMovement()
{
  console.log("SEE TIHS MOVE");
  trueRan = d.getTime() % 5;
  var changeX = oldx - accel.x;
  var changeY = oldy - accel.y;
  var changeZ = oldz - accel.z;
  oldx = accel.x;
  oldy = accel.y;
  oldz = accel.z;
  console.log("SEE TIHS MOVE2");
  totalChange = Math.sqrt(Math.pow(changeX, 2) + Math.pow(changeY, 2) + Math.pow(changeZ, 2));
  randomHelper = (randomHelper + totalChange)/2;
  console.log("SEE TIHS MOVE3");
}
// myLabel.text = workOuts[trueRan].title;
clock.granularity = "seconds";
var otherRunning = false;
var oldx = 0;
var oldy = 0;
var oldz = 0;
var failed = false;
var overCount = 0
var neverSeeThis = false;
clock.ontick = evt => {
    if(otherRunning)
      {
        //console.log("this is working");
        return;
      }
       
   totalChange = getMovement();
  //myLable.text = totalChange;
  if(totalChange >= 20.01)
    {
      count = 0
    }
  else
    {
      count++;
    }
  if(count >= 9)//for real life implementation change to if(count >= 900)
    //this part checks for no movement for the amount of time in the if statement (time in seconds ||  900 is 15 minutes)
    {
          aa = (aa + 1) % 8 // number of different exercises
          myLable.text = workOuts[aa].title;
          previousTruRan = trueRan;
      checkWorkingOut(5)
      if(overCount >= 5)
        {
          count = 0;
          overCount = 0;
          myLable.text = "done for now!";
          }
    }
}

 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var superPicCount = 0;
 async function checkWorkingOut(seconds)
{
  console.log("SEEEE THISSSS");
  failed = true;
  otherRunning = true;
  var waitTime = seconds; //in seconds
  console.log("SEEEE THISSSS2");
  while (waitTime > 0)
    {
      console.log("SEEEE THISSSS3");
      waitTime = waitTime - 1;
      totalChange = getMovement();
      console.log("seee THIISSSSS3.5");
      if(totalChange > 20)
        {
          failed = false;
        }
      console.log("this should wait a second");
      await sleep(1000);
      console.log("did it wait a second?")
    }
  console.log("SEEEE THISSSS4");
  if(failed)
        {
          myLable.text = "MOVE!";
        }
      else
        {
          myLable.text = 'well done!';
          overCount++;
        }
  console.log("4 second");
  await sleep(4000);
  console.log("4 seconds?");
  
  //here
  picCount++
  if (picCount == 4)
    {
      picCount  = 0;
      background.href = backgrounds[superPicCount];
      superPicCount++;
      superPicCount = superPicCount % 5;
    }
  
  
  otherRunning = false;
}

  



