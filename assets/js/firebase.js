
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCcWqq8_4Hq5_m2PJQ-MPCQrxMR_3_7YsA",
  authDomain: "obd---wirin.firebaseapp.com",
  databaseURL: "https://obd---wirin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "obd---wirin",
  storageBucket: "obd---wirin.appspot.com",
  messagingSenderId: "603449933161",
  appId: "1:603449933161:web:9346fb8f26a144afbe51f8",
  measurementId: "G-LC04DR2EX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, set, get, update, remove, ref, child }
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const db = getDatabase();

var battery = document.querySelector("#battery");
var range = document.querySelector("#range");
var temp = document.querySelector("#temp");
var start = document.querySelector("#start");
var odometer = document.querySelector("#odometer");
var steerangle = document.querySelector("#steerangle");
var motortemp = document.querySelector("#motortemp");
var batterytemp = document.querySelector("#batterytemp");
var fl = document.querySelector("#fl");
var fr = document.querySelector("#fr");
var bl = document.querySelector("#bl");
var br = document.querySelector("#br");
var voltage = document.querySelector("#voltage");
var current = document.querySelector("#current");


var steer = 0;
var current_rotation = 0;

var rpm=0;
var speed=0;



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// console.log("Hello");
// sleep(2000);
// console.log("World!");

function FindData() {
  const dbref = ref(db);
  for (var i = 0; i < 40; i++) {
    //if(i==39) {i=0;}
    //id.value
    var id = i.toString();

    console.log(typeof (id));
    console.log(id);

    get(child(dbref, id))
      .then((snapshot) => {
        if (snapshot.exists()) {
          battery.innerHTML = snapshot.val().battery + "%";
          temp.innerHTML = Math.round(snapshot.val().temp* 100) / 100 + "°C";
          range.innerHTML = snapshot.val().range + "Km";
          rpm = snapshot.val().RPM;
          speed = snapshot.val().Speed;

          odometer.innerHTML = snapshot.val().odometer;
          steerangle.innerHTML = snapshot.val().steerangle + "°";
          steer = snapshot.val().steerangle;
          motortemp.innerHTML = Math.round(snapshot.val().temp * 100) / 100+ "°C";
          batterytemp.innerHTML = Math.round(snapshot.val().batterytemp * 100) / 100+ "°F";
          fl.innerHTML = snapshot.val().fl + "Psi";
          fr.innerHTML = snapshot.val().fr + "Psi";
          bl.innerHTML = snapshot.val().bl + "Psi";
          br.innerHTML = snapshot.val().br + "Psi";
          current.innerHTML = Math.round(snapshot.val().current * 100) / 100 + "A";
          voltage.innerHTML = Math.round(snapshot.val().voltage * 100) / 100 + "V";
          //rotate steer

          current_rotation = steer;
          document.querySelector("#steering").style.transform = 'rotate(' + current_rotation + 'deg)';
          document.querySelector('#revmeter .gauge').style.setProperty('--rpm', rpm);
          document.querySelector('#speedmeter .gauge').style.setProperty('--kmh', Math.round(speed));

          sleep(2000);

        }
      })
  }

}

function UpdateData() {

}

function RemoveData() {


}
start.addEventListener('click', FindData);