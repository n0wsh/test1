let firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
