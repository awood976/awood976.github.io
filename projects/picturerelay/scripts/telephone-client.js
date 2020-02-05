var mainHTML = document.getElementById('main-content');

var roomcode;
var username;
// var tmp = 'RIP';

function joingame() {
    // alert("Joining Game!");

    roomcode = getUrlVars()["roomcode"];
    username = getUrlVars()["username"].replace("+"," ");
    alert(roomcode + ' ' + username);

    // var tmp = 'RIP';

    database.ref('Session/' + roomcode).once('value').then(function(snapshot){
        if(snapshot.exists()) {
            alert("Joining Room: " + roomcode + ' ' + username);
            var numplayers = snapshot.val().players;
            var player = "player" + numplayers;
            alert(player);

            database.ref('Players/' + roomcode + '/' + player).set({
                name: username
            });
            database.ref('Session/' + roomcode).update({
                players: parseInt(numplayers)+1
            });

            clearScreen();
            mainHTML.innerHTML = "Welcome " + username + "! Waiting for host to start the game.";
        }
        else {
            alert("Not a valid room!");
        }
    });

    // alert("Joining Game.");
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function clearScreen() {
    mainHTML.innerHTML = "";
}
