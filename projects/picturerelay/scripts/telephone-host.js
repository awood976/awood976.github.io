// Session Information
var roomcode;
var numPlayers = 0;
var gameState = 'lobby';

// Global Variables
var mainHTML = document.getElementById('main-content');
var counter = 0;
var interval;

function startsession() {
    createRoom();
    clearScreen();

    // LOBBY WAIT
    mainHTML.innerHTML = "Your room code: " + roomcode + "<br>Waiting for Players to Join!";
    // var player_list = document.createElement();
    // DISPLAY PLAYERS
    database.ref('Players/' + roomcode).on('value', function(snapshot) {
        // alert("Player "+database.ref('Session/'+roomcode).players+" has joined.");
        // mainHTML.innerHTML = mainHTML.innerHTML + '<br>' + snapshot.val().child().name;
        snapshot.forEach(function(childSnap) {
            mainHTML.innerHTML = mainHTML.innerHTML + '<br>' + childSnap.key;
        });
    });
}

function endsession() {
    database.ref('Session/' + roomcode).remove();
    database.ref('Players/' + roomcode).remove();
}

function createRoom() {
    roomcode = generateRoomCode();

    database.ref('Session/' + roomcode).set({
      // roomcode: roomcode,
      players: '0',
      gamestate: 'lobby'
    });

}

function clearScreen() {
    mainHTML.innerHTML = "";
}

function startTimer(duration) {
    counter = duration;
    interval = setInterval(countdown, 1000);
}

function countdown() {
    counter = counter - 1;
    // Display Information
    // mainHTML.innerHTML = counter;
    if(counter == 0) {clearInterval(interval);}
}

function generateRoomCode() {
    var unique = false;
    var code;
    while (!unique) {
        code = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        unique = true;
        console.log("Generated code: " + code);
        // MAKE UNIQUE CODES
        // var urlRef = database.ref().child("Session/");
        // urlRef.once("value", function(snapshot) {
        //   snapshot.forEach(function(child) {
        //     console.log(child.key+": "+child.val());
        //     if (code == child.key) {
        //         unique = false;
        //         console.log("Not unique! Rerolling code.");
        //     }
        //   });
        // });
    }
    return code;
}
