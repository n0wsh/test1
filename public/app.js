let loc = window.location.href;
let url = new URL(loc);
let roomid = url.searchParams.get("roomid");

let firebaseConfig = {
    apiKey: "AIzaSyBRVBAbF_Urk5BtJo2VrjXNkpgmt4RIrZw",
    authDomain: "tugofwars2.firebaseapp.com",
    projectId: "tugofwars2",
    storageBucket: "tugofwars2.appspot.com",
    messagingSenderId: "944394310186",
    appId: "1:944394310186:web:e4199f9baf2c241ed72953"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let roomData;

let controller = document.getElementById("controller")
let main = document.getElementById("main")
let redScoreEl = document.getElementById("redscore")
let blueScoreEl = document.getElementById("bluescore")
let redSide = document.getElementById("red")
let blueSide = document.getElementById("blue")
let redWin = document.getElementById("redWin")
let blueWin = document.getElementById("blueWin")
let redScore = 50;
let blueScore = 50;
let redScoreWidth = redScore
let blueScoreWidth = blueScore

redScoreEl.innerHTML = redScore
blueScoreEl.innerHTML = blueScore

redSide.style.width = `${redScore}%`
blueSide.style.width = `${blueScore}%`

db.collection("rooms")
  .doc(roomid)
  .onSnapshot((doc) => {
    roomData = doc.data();
    blueSide.style.width = doc.data().blue + "vw";
    redSide.style.width = doc.data().red + "vw";
    redScore = doc.data().red;
    blueScore = doc.data().blue;
  });

const reset = () => {
  db.collection("rooms")
    .doc(roomid)
    .update({
      red: 50,
      blue: 50,
    });
  redScore = 50
  blueScore = 50
  redScoreEl.innerHTML = 50
  blueScoreEl.innerHTML = 50
  redScoreWidth = 50
  blueScoreWidth = 50
  redSide.style.width = "50%"
  blueSide.style.width = "50%"
  redWin.style.display = "none"
  blueWin.style.display = "none"
  controller.style.display = "flex"
  main.style.display = "flex"
}

const leave = () => {
  window.location = "index.html"
}

const red = () => {
  let bWidth = roomData.blue;
  let pw = roomData.red;
  if (pw == 100) {
      redWin.style.display = "flex"
      controller.style.display = "none"
      main.style.display = "none"
  } else {
    bWidth--;
    pw++;
    blueScore = bWidth
    redScore = pw
    redScoreWidth++
    blueScoreWidth--
    db.collection("rooms")
      .doc(roomid)
      .update({
        red: pw,
        blue: bWidth,
      });
      let bluediv = blueScoreEl;
      let bluetoo = parseInt(bluediv.innerHTML);
      let reddiv = redScoreEl;
      let redtoo = parseInt(reddiv.innerHTML);
      bluediv.innerHTML = bluetoo = bluetoo - 1;
      reddiv.innerHTML = redtoo = redtoo + 1;
  }
}

const blue = () => {
  let bWidth = roomData.blue;
  let pw = roomData.red;
  if (bWidth == 100) {
    blueWin.style.display = "flex"
    controller.style.display = "none"
    main.style.display = "none"
  } else {
    bWidth++;
    pw--;
    blueScore = bWidth
    redScore = pw
    blueScoreWidth++
    redScoreWidth--
    db.collection("rooms")
      .doc(roomid)
      .update({
        red: pw,
        blue: bWidth,
      });
    let bluediv = blueScoreEl;
    let bluetoo = parseInt(bluediv.innerHTML);
    let reddiv = redScoreEl;
    let redtoo = parseInt(reddiv.innerHTML);
    bluediv.innerHTML = bluetoo = bluetoo + 1;
    reddiv.innerHTML = redtoo = redtoo - 1;
  }
}