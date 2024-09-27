function getImage(src, width, height){

const image = new Image();
image.src = src;
image.setAttribute("class", `w-${width} h-${height} mx-auto d-block`);
return image;

}


function getBoxText(text, color, background){

const box = document.createElement("div");
box.textContent = text;
box.setAttribute("class", `alert text-${color} alert-${background} w-75 mx-auto display-4 mt-3`);
return box;

}


function getButton(text, color, background){
const button = document.createElement("button");
button.textContent = text;
button.setAttribute("class", `btn w-50 text-${color} btn-outline-${background} mx-auto mt-5 play-button`);
button.setAttribute("onClick", "$('body').hide(1000, getStart)");
return button;
}


function clearElement(element){
element.innerHTML = "";
}

function getStart(){
clearElement(document.body);
document.body.removeAttribute("class");
exit(1);
}

function exit(code){
if(!code && code !== 0)
clearElement(document.body);
if(code == 0) initial();
else if(code == 1) $("body").hide("slow", homePage).show("slow");
}

function initial(){
document.body.innerHTML = "";
let image = getImage("img/sudoku-logo.png", 50, "auto");
let box = getBoxText("Sudoku Game", "light", "danger");
let button = getButton("Jogar", "primary", "light");
let body = document.body;
$("body").hide("fast");
body.setAttribute("class", "bg-info text-center");
body.appendChild(box);
body.appendChild(image);
body.appendChild(button);
$("body").show("slow");
}

function createText(element, texts){
let i = 1;
let child;
for(let j of texts){
if(i === 1){
child = document.createElement("h2");
child.setAttribute("class", "mx-auto mb-3");
child.textContent = j;
}
else{
child = document.createElement("p");
child.setAttribute("class", "ms-1 my-2");
child.textContent = j;
}
element.appendChild(child);
i++;
}
}


function homePage(){
clearElement(document.body);
const lastGame = verifLastGame();
const body = document.body;
const title = document.createElement("h1");
title.textContent = "SUDOKU";
title.setAttribute("class", "display-1 text-info text-center mt-1 mb-5 title");
body.appendChild(title);
const easyButton = document.createElement("button");
const normalButton = document.createElement("button");
const hardButton = document.createElement("button");
const container = document.createElement("div");
container.setAttribute("class", "d-flex justify-content-evenly my-5");
[easyButton, normalButton, hardButton].forEach((x, y) =>{
x.setAttribute("class", "btn btn-light text-dark text-center level-button bg-info level-button");
if(y === 0){
createText(x, ["Fácil", `Recorde: ${getRecordTime(0)[0]}`, `Data: ${getRecordTime(0)[1]}`]);
x.setAttribute("onClick", "player('easy')");
}
else if(y === 1){
createText(x, ["Normal", `Recorde: ${getRecordTime(1)[0]}`, `Data: ${getRecordTime(1)[1]}`]);
x.setAttribute("onClick", "player('normal')");
}
else if(y === 2){
createText(x, ["Difícil", `Recorde: ${getRecordTime(2)[0]}`, `Data: ${getRecordTime(2)[1]}`]);
x.setAttribute("onClick", "player('hard')");
}
container.appendChild(x);
});
body.appendChild(container);
const closeButton = document.createElement("div");
closeButton.setAttribute("class", "bi-x-circle d-block mt-5 w-100 text-center display-1 text-danger");
closeButton.setAttribute("onClick", "exit(0)");
$("body").addClass(background);
body.appendChild(lastGame);
body.appendChild(closeButton);
$("body").show("slow");
}

function player(level){
/*exit();
sudoku(level);*/
$("body").hide("slow", showSudoku);
function showSudoku(){
exit();
if(level == " ") sudoku(level, true);
else sudoku(level);
$("body").show("slow");
}
}
function initializing(){
document.body.innerHTML = "";
initial();
}
initializing();