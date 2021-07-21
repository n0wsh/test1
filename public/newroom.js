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

let rooms = document.getElementById("room-list");

db.collection("rooms").onSnapshot((docs) => {
  rooms.innerHTML = "";
  docs.forEach((doc) => {
    let cont = document.createElement("li");
    let name = document.createElement("h5");
    name.innerHTML = doc.data().roomName;
    let players = document.createElement("h5");
    players.innerHTML = doc.data().players;

    cont.appendChild(name);
    cont.appendChild(players);

    rooms.appendChild(cont);

    cont.onclick = async () => {
      let playersNumber = doc.data().players;
      if (playersNumber < 2) {
        playersNumber++;
        await db.collection("rooms").doc(doc.id).update({
          players: playersNumber,
        });
        window.location = `room.html?roomid=${doc.id}`;
      } else {
        alert("room is full!")
      }
    };
  });
});

const createroom = () => {
  let roomName = document.getElementById("room-input").innerText;
  db.collection("rooms").add({
    roomName: roomName,
    players: 0,
    red: 50,
    blue: 50,
  });
};
