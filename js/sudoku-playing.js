/*
* copyright @marcosarlove
* december 2023
* All Rights Reserved
*/

let _STATE = true, _SONGS = true, tableNums, tableCels, background, _ERROR = 0, numsQuant = [];
const color = getColors();
tableNums = color.tableNums;
tableCels = color.tableCels;
background = color.background;
const doneAudio = new Audio("audio/done.ogg");
const wrongAudio = new Audio("audio/wrong.ogg");

function refreshColors(){
const color = getColors();
tableNums = color.tableNums;
tableCels = color.tableCels;
background = color.background;
let element = document.querySelectorAll("td");
element.forEach( cel => {
cel.style.backgroundColor = tableCels;
cel.style.color = tableNums;
});
let modals = document.querySelectorAll(".modal-content");
modals.forEach(modal => {
modal.style.backgroundColor = tableCels;
modal.style.color = tableNums;
});
}

refreshColors();

function insertNumber(element){

if(element.dataset.state === "off") return
if(actualCel.dataset.imutable === "1") return
actualCel.dataset.content = element.dataset.content;
actualCel.textContent = element.dataset.content;
let row = actualCel.dataset.row;
let col = actualCel.dataset.col;

if(actualCel.dataset.content == table[row][col]){
if(_SONGS) doneAudio.play();
actualCel = turnImutable(actualCel, "1");
actualCel.dataset.error = "0";
setLights(actualCel, [1, 0, 0]);
secondTable[row][col] = element.dataset.content;
setLights(actualCel, [1, 0, 1]);
refresh();
return
}
numberInvalid(actualCel);
}

function updateQuantOfNums(){
let elements = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for(let row of secondTable)
row.forEach( n => {
if(n == 1) elements[0]++;
else if(n == 2) elements[1]++;
else if(n == 3) elements[2]++;
else if(n == 4) elements[3]++;
else if(n == 5) elements[4]++;
else if(n == 6) elements[5]++;
else if(n == 7) elements[6]++;
else if(n == 8) elements[7]++;
else if(n == 9) elements[8]++;
});
return elements;
}


function disableNums(){
const element = updateQuantOfNums();
element.forEach( (num, position) =>{
if(num == 9 && _STATE){
position++;
let button = document.querySelector(`.bi-${position}-circle`);
button.dataset.state = "off";
$(`.bi-${position}-circle`).addClass("text-muted");
}else{
position++;
let button = document.querySelector(`.bi-${position}-circle`);
button.dataset.state = "on";
$(`.bi-${position}-circle`).removeClass("text-muted");
}
});
}



function numberInvalid(element){
if(_SONGS) wrongAudio.play();
_ERROR++;
setError(_ERROR);
updateError();
delete nums[nums.indexOf(actualCel)];
actualCel.dataset.error = "1";
actualCel.style.color = "#f00";
deleteNum.dataset.state = "on";
setLights(actualCel, [1, 0, 1]);
}

function removeNumber(){
if(deleteNum.dataset.state === "off" || actualCel.dataset.error === "0") return
actualCel.dataset.content = " ";
actualCel.textContent = " ";
actualCel.dataset.error = "0";
celClicked(actualCel, [1, 0, 1]);
}

/* Copia uma matriz duplamente aninhada */

function copyBoard(board){
let copy = [];
for(let i = 0; i < board.length; i++){
let block = [];
for(let j = 0; j < board[i].length; j++)
block.push(board[i][j]);
copy.push(block);
}
return copy;
}



/* Determina quantos números serão excluídos da tabela */

function numberOfElements(level){
let elements = [];
let min, max;
if(level === "easy"){
min = 16;
max = 32;
} else if(level === "normal"){
min = 34;
max = 45;
} else if(level === "hard"){
min = 50;
max = 64;
} else return

for(let i = min; i < max + 1; i++)
elements.push(i);

return elements[Math.floor(Math.random()*elements.length)];

}



/* Exclui elementos da tabela */

function deleteElements(board, level = "easy"){
let num = numberOfElements(level);
let list = createUnsortList(81);

for(let i = 0; i < num + 1; i++){
let temp = dictOfCoords()[list[i]];
board[temp[0]][temp[1]] = " ";
}
return board;
}



/* Cria uma lista de n elementos desordenados */

function createUnsortList(n) {
  let lista = [];

  for (let i = 0; i < n; i++) {
    let numeroAleatorio = Math.ceil(Math.random() * n);
    if(lista.indexOf(numeroAleatorio) != -1) { i-- ; continue;}
    lista.push(numeroAleatorio);
  }
  
  return lista;
}



/* Cria um objeto com número-coordenada de todas as células */

function dictOfCoords(){
let dict = {};
let count = 0;
for(let row = 0; row < 9; row++)
for(let col = 0; col < 9; col++){
count++;
dict[count] = [row, col];
}

return dict;
}






function setLastSettings(){
/* Modo Interativo */
if(getInterativeMode() == "false"){
let element = document.querySelector("#interative");
element.dataset.state = "on";
toggleState("#interative");
_STATE = false;
}
/* Modo Noturno */
if(background.indexOf("bg-dark") != -1){
let element = document.querySelector("#night");
element.dataset.state = "off";
toggleState("#night");
}
$("body").addClass(background);
$("table").addClass(background);
$("#settings").addClass(background);

/* Audio */
if(getSongState() == "false"){
let element = document.querySelector("#song");
element.dataset.state = "on";
toggleState("#song");
_SONG = false;
}
}






function verifLastGame(){
if(getGameOn() == "false" || !getGameOn())
return document.createElement("span");

const element = document.createElement("button");
element.setAttribute("class", "text-center btn btn-info w-75 d-block mx-auto text-dark mt-5 small last-game");
element.setAttribute("onClick", "player(' ', true)");
element.textContent = "Continuar Jogo Anterior";
return element;
}

function resetBoard(){
clearTimeout(timeout);
$("#loser-painel").addClass("hide");
$("#winner-painel").addClass("hide");
_ERROR = 0;
player(getLevel());
count = 0;
}

function zFill(){
for(let i = 0; i < 9; i++)
for(let j = 0; j < 9; j++)
if(table[i][j] === " ")
table[i][j] = 0;

}
function counter(mode){
let nums = [0, 0];
if(mode) count = getTime();
const tab = document.querySelector("#counter");
count++;
if(count < 60) nums[1] = count;
else{
nums[0] = Math.floor(count/60);
nums[1] = count % 60;
}
tab.innerHTML = `${nums[0]} : ${nums[1]}`;
if(nums[0] > 5 && nums[0] < 10)
$("#counter").addClass("text-warning");
else if(nums[0] >= 10)
$("#counter").addClass("text-danger");

setTime(count);
timeout = setTimeout(counter, "1000");
}

function updateError(){
const element = document.querySelector("#errors");
element.textContent = `${_ERROR} Erros`;
if(_ERROR >= 5){
document.querySelector("#lose-error").innerHTML = _ERROR;
document.querySelector("#lose-time").innerHTML = `${Math.floor(count/60)}:${count%60}`;
$("#loser-painel").addClass(background).removeClass("hide");
clearTimeout(timeout);
gameOn(false);
setError(0);
}
}

function setPainels(){

document.body.innerHTML += ` <div class="modal fade" tabindex="-1" id="reset">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h2 class="modal-title "> Reiniciar</h2>
<button class="btn-close ms-5" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
Desejas Reiniciar o Sudoku?
</div>

<div class="modal-footer">
<button type="button" class="btn btn-primary" id="iniciar" onClick="resetBoard()"> Reiniciar </button>

<button type="button" class="btn btn-danger" data-bs-dismiss="modal"> Cancelar
</button></div></div></div></div>`;


document.body.innerHTML += `<div class="modal fade" tabindex="-1" id="clear">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h2 class="modal-title ">Limpar Dados do Jogo</h2>
<button class="btn-close ms-5" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
Desejas Apagar Todos os Dados Jogo?
</div>

<div class="modal-footer">
<button type="button" class="btn btn-primary" id="iniciar" onClick="deleteAllData()" data-bs-dismiss="modal">Limpar</button>

<button type="button" class="btn btn-danger" data-bs-dismiss="modal"> Cancelar
</button></div></div></div></div>`;


document.body.innerHTML += ` <div class="modal fade" tabindex="-1" id="left">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h2 class="modal-title ">Sair</h2>
<button class="btn-close ms-5" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">




Desejas Sair do Jogo?
</div>

<div class="modal-footer">
<button type="button" class="btn btn-primary" id="iniciar" onClick="location.replace('about:blank')">Sair</button>

<button type="button" class="btn btn-danger" data-bs-dismiss="modal"> Cancelar
</button></div></div></div></div>`;


document.body.innerHTML += `
<div id="settings" class="offcanvas offcanvas-start" tabindex="-1">

<div class="offcanvas-header">
<div class="offcanvas-title display-6 text-info small">
Configurações </div>
<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>

<nav class="offcanvas-body offcanvas-content">
<div class="d-flex justify-content-between" onClick="nightMode('#night')" ><span>Modo Noturno</span><i data-state="off" id="night" class="bi-toggle2-off text-info display-6"></i></div>
<hr>
<div class="d-flex justify-content-between" onClick="interativeMode('#interative')"><span>Modo Interativo</span><i id="interative" data-state="on" class="bi-toggle2-on text-info text-end display-6"></i></div>

<hr>
<div class="d-flex justify-content-between" onClick="toggleSong()"><span>Efeitos Sonoros</span><i class="bi-toggle2-on display-6 text-info" data-state="on" id="song"></i></div>

<hr>
<div class="d-flex justify-content-between" data-bs-target="#clear" data-bs-toggle="modal"><span>Limpar Dados do Jogo</span><i class="bi-trash3 display-6 text-info"></i></div>
<hr>
<div class="d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#acerca"><span>Sobre</span><i class="bi-person display-6 text-info"></i></div>

<hr>
<div class="d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#left"><span>Sair</span><i class="bi-power display-6 text-danger"></i></div>


</nav>
</div>
`;

document.body.innerHTML += `<div class="w-100 h-100 py-5 position-absolute translate-middle top-50 start-50 bg-light shadow text-center hide opacity" id="loser-painel"><h2 class="text-center small mt-5">Você Perdeu!</h2>
<div class="text-center mt-2"><br>
Erros: <span id="lose-error"></span> <br>
Tempo: <span id="lose-time"></span><div>
<button onClick="resetBoard()" class="btn btn-primary mt-5">Reiniciar</button>
<button onClick="clearGame(); exit(1)" class="btn btn-warning mt-5">Sair</button>
</div>`;


document.body.innerHTML += `<div class="w-100 h-100 py-5 position-absolute translate-middle top-50 start-50 bg-light shadow text-center hide opacity" id="winner-painel"><h2 class="text-center small mt-5">Você Ganhou!</h2>
<div class="text-center mt-2"><br>
Erros: <span id="winner-error"></span> <br>
Tempo: <span id="winner-time"></span><div>
<button onClick="resetBoard()" class="btn btn-primary mt-5">Reiniciar</button>
<button onClick="clearGame(); exit(1)" class="btn btn-warning mt-5">Sair</button>
</div>`;




document.body.innerHTML += `
<div class="modal fade" tabindex="-1" id="acerca">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h2 class="modal-title ">Bem-Vindo ao Jogo Sudoku</h2>
<button class="btn-close ms-5" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body h-50">
<p>Este jogo foi desenvolvido por <strong>Marcos Arlove</strong>, um entusiasta de jogos de quebra-cabeça e programação. O Sudoku Web é um projeto pessoal que visa proporcionar uma experiência divertida e desafiadora para os fãs de Sudoku.</p>

<p>O jogo foi desenvolvido usando tecnologias web modernas, como <em>Bootstrap</em> e <em>JQuery</em>, para garantir uma experiência flexível e responsiva em qualquer dispositivo.</p>

<p>Se você tiver alguma dúvida, sugestão ou feedback sobre o jogo, não hesite em entrar em contato através do email <a href="mailto:marcosarlove@gmail.com">marcosarlove@gmail.com</a>. Sua opinião é importante para nós e nos ajuda a melhorar o jogo.</p>

<p>Esperamos que você se divirta jogando o Sudoku Web e que ele lhe proporcione horas de entretenimento e desafios mentais. <b>Obrigado por jogar!</b></p>
</div>

<div class="modal-footer">
<button type="button" class="btn btn-success" data-bs-dismiss="modal">Fechar
</button></div></div></div></div>`;

}



function toggleState(name){
element = document.querySelector(name);
if(element.dataset.state == "off"){
element.dataset.state = "on";
$(name).removeClass("bi-toggle2-off");
$(name).addClass("bi-toggle2-on");
}else if(element.dataset.state == "on"){
element.dataset.state = "off";
$(name).removeClass("bi-toggle2-on");
$(name).addClass("bi-toggle2-off");
}else return

}

function toggleSong(){
toggleState("#song");
const element = document.querySelector("#song");
if(element.dataset.state == "on"){
setSongState(true);
_SONGS = true;
}else{
setSongState(false);
_SONGS = false;
}
}

function interativeMode(nameId){
toggleState(nameId);
const element = document.querySelector(nameId);
if(element.dataset.state == "off"){
_STATE = false;
setInterativeMode(false);
disableNums();
}else{
_STATE = true;
setInterativeMode(true);
disableNums();
}
}



function nightMode(nameId){
toggleState(nameId);
element = document.querySelector(nameId);
if(element.dataset.state == "on")
setColors(true);
else setColors(false);
$("body").toggleClass(background);
$("table").toggleClass(background);
$("#settings").toggleClass(background);
refreshColors();
$("body").addClass(background);
$("table").addClass(background);
$("#settings").addClass(background);
}


function refresh(){
disableNums();
setLastGame(table, secondTable);
for(let i = 0; i < 9; i++)
for(let j = 0; j < 9; j++){
if(table[i][j] != secondTable[i][j])
return
}
winner();
gameOn(false);
}

function clearGame(){
secondTable = "";
_ERROR = 0;
count = 0;
$("loser-painel").addClass("hide");
$("winner-painel").addClass("hide");
}

function winner(){
$("#winner-painel").addClass(background).removeClass("hide");
document.querySelector("#winner-error").innerHTML = _ERROR;
document.querySelector("#winner-time").innerHTML = `${Math.floor(count/60)} : ${count%60}`;
setRecord();
setError(0);
}


function setRecord(){

if(getLevel() == "easy"){
if(getRecordTime(0)[2] == 0)
setRecordTime(0, count);
else if(getRecordTime(0)[2] > count)
setRecordTime(0, count);

}else if(getLevel() == "normal"){
if(getRecordTime(1)[2] == 0)
setRecordTime(1, count);
else if(getRecordTime(1)[2] > count)
setRecordTime(1, count);

}else if(getLevel() == "hard"){
if(getRecordTime(2)[2] == 0)
setRecordTime(2, count);
else if(getRecordTime(2)[2] > count)
setRecordTime(2, count);

}
}


/* Começa o Jogo */
let actualCel, deleteNum, table, secondTable, count = 0, state, timeout;
let nums = [];
let cols = [];
let rows = [];
const _MAX = 0;

const sudoku = (level, mode) => {
setPainels();
setLastSettings();
if(!mode){
table = createSudokuTable();
table = initBoard(table, _MAX);
solveSudoku();
secondTable = copyBoard(table);
secondTable = deleteElements(secondTable, level);
setLevel(level);
}else{
_ERROR = getError();
table = getLastGame()[0];
secondTable = getLastGame()[1];
state = true;
}
if(level != " ") state = false;
count = 0;
headerBar();
printTable(secondTable);
refreshColors();
numbersBar();
disableNums();
counter(state);
updateError();
setLastGame(table, secondTable);
gameOn(true);
}

