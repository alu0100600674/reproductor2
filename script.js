function play(num){
    var audio = document.getElementById("audio" + num);
    var play = document.getElementById("play" + num);
    var iplay = document.getElementById("iplay" + num);
    var tiempo = document.getElementById("tiempo" + num);
    tiempo.setAttribute("max", audio.duration);
    var pent = document.getElementById("pentagrama" + num);

    audio.addEventListener("ended", function(){
        // play.setAttribute("value", "PLAY");
        iplay.setAttribute("class", "fa fa-play");
        if(audio.currentTime == audio.duration){
            notificarFin(num);
        }
        audio.currentTime = 0;
        tiempo.value = 0;
        pent.removeAttribute("style");
    });

    if(audio.paused){
        audio.play();
        // play.setAttribute("value", "PAUSE");
        iplay.setAttribute("class", "fa fa-pause");
        play.setAttribute("style", "background:green;")
        if(num == 1){
            pent.setAttribute("style", "animation: mover-pentagramaL 4s linear infinite;")
        }
        else{
            pent.setAttribute("style", "animation: mover-pentagramaR 4s linear infinite;")
        }
    }
    else{
        audio.pause();
        // play.setAttribute("value", "PLAY");
        iplay.setAttribute("class", "fa fa-play");
        play.setAttribute("style", "background:orange;")
        pent.removeAttribute("style");
    }
}

function stop(num){
    var audio = document.getElementById("audio" + num);
    var play = document.getElementById("play" + num);
    var iplay = document.getElementById("iplay" + num);
    var stop = document.getElementById("stop" + num);
    var tiempo = document.getElementById("tiempo" + num);
    var pent = document.getElementById("pentagrama" + num)
    audio.pause();
    audio.currentTime = 0;
    tiempo.value = 0;
    // play.setAttribute("value", "PLAY");
    iplay.setAttribute("class", "fa fa-play");
    play.setAttribute("style", "background:red;")
    pent.removeAttribute("style");
}

var ant1 = 0;
var ant2 = 0;
function mute(num){
    var audio = document.getElementById("audio" + num);
    var vol = document.getElementById("vol" + num);
    var mute = document.getElementById("mute" + num);
    var imute = document.getElementById("imute" + num);

    if(audio.volume > 0){
        if(num == 1){
            ant1 = vol.value;
        }
        else{
            ant2 = vol.value;
        }
        audio.volume = 0;
        vol.value = 0;
        //mute.setAttribute("style", "background:red;")
        imute.setAttribute("class", "fa fa-volume-off");
    }
    else{
        if(num == 1){
            audio.volume = ant1;
            vol.value = ant1;
        }
        else{
            audio.volume = ant2;
            vol.value = ant2;
        }
        //mute.setAttribute("style", "background:green;")
        imute.setAttribute("class", "fa fa-volume-up");
    }
}

function volumen(num){
    var vol = document.getElementById("vol" + num).value;
    var audio = document.getElementById("audio" + num);
    audio.volume = vol;
}

function tiempo(num){
    var audio = document.getElementById("audio" + num);
    var tiempo = document.getElementById("tiempo" + num);
    audio.currentTime = tiempo.value;
}

function actTiempo(num){
    var audio = document.getElementById("audio" + num);
    var tiempo = document.getElementById("tiempo" + num);
    tiempo.value = audio.currentTime;
}

function cambiarCanal(){
    var audio1 = document.getElementById("audio1");
    var audio2 = document.getElementById("audio2");
    var canal1 = document.getElementById("canal1");
    var canal2 = document.getElementById("canal2");

    var aux = canal1.getAttribute("value");
    canal1.setAttribute("value", canal2.getAttribute("value"));
    canal2.setAttribute("value", aux);

    var aux2 = panNode.pan.value;
    panNode.pan.value = panNode2.pan.value
    panNode2.pan.value = aux2;
}

function notificarFin(num){
    title = "¡Reproductor " + num + ": Stop!";
    options = {
        body: "El reproductor " + num + " ha terminado de reproducir.",
        icon: "images/stop.png"
    };
    Notification.requestPermission(function(){
        new Notification(title, options);
    });
}
