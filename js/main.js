"use strict"

let canvas, ctx;

var wheel;


//story pieces
var openings = new Array(3);
var clues = new Array(6);
var murders = new Array(6);
var endings = new Array(4);

var clueNum = 0;
var murdNum = 0; //number of murders this game

//html class to put story in
var clueBox;

var magnifyingGlass = new Image(590,298);
magnifyingGlass.src = "media/magnifyingGlass.png";

var intervalID; //for setting fps

var cheatMenu;
var cheat = 0;

const init = () =>{
    
    //set up main canvas
	canvas = document.querySelector('#mainCanvas');
	ctx = canvas.getContext('2d');
        console.log("initializing" + canvas);
    
    //set text for scores
    ctx.font = "60px BigTop";
    ctx.fillStyle = "yellow";
    
    wheel = new Wheel(10);
    
    ctx.drawImage(magnifyingGlass,400,10);
    

    //set up various listeners
    canvas.onmouseup = click;
    
    cheatMenu = document.getElementById("cheatMenu");
    cheatMenu.onchange = function(){
        if(cheatMenu.selectedIndex != -1){
            cheat = cheatMenu.options[cheatMenu.selectedIndex].text;
        }
    }
    
    clueBox = document.getElementById("clueBox");
    
    loadClue(0);
}

const start = () =>{
    if(typeof intervalID != "undefined") clearInterval(intervalID);
    intervalID = setInterval(animate, 50);
}

function cheating(){
        wheel.setCheating(cheat);
}
function cancelCheating(){
    wheel.endCheating();
}

function loadClue(type){
    if(type == 0){
        clueBox.innerHTML += "<hr><p>" + randArray(openings).getText() + "</p>";
       }
    if(type == 1){
        clueBox.innerHTML += "<hr><p>" + randArray(clues).getText() + "</p>";
        clueNum++;
       }
    if(type == 2){
        clueBox.innerHTML += "<hr><p>" + randArray(murders).getText() + "</p>";
        murdNum++;
       }
    if(type == 3){
            clueBox.innerHTML += "<hr><p>" + endings[murdNum].getText() + "</p>";
       }
}


function click(e){
    var mouse = getMouse(e); //get the mouse position
    if(!wheel.getSpinning()){
        wheel.setSpinning(true);
        wheel.setStopping(false);
        start();
    }
    else{
        wheel.setSpinning(false);
        wheel.setStopping(true);
    }
}

//get the current mouse location relative to the canvas
function getMouse(e){
	var mouse = {}
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
}

//easily switch a bool
function boolSwitch(b){
    var bl;
    if(b) bl = false;
    else{ bl = true; }
    return bl;
}

function randArray(ar){
    var rand = ar[Math.floor(Math.random() * ar.length)];
    return ar;
}



window.onload = init;