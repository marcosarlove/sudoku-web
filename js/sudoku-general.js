/*
* copyright @marcosarlove
* december 2023
* All Rights Reserved
*/


function gerateEqualsCels(value, refer){
let cels = document.getElementsByTagName("td");
let celsValid = [];
if(refer === "content"){
for(let i = 0; i < cels.length; i++){
if(cels[i].dataset.content === value && cels[i].dataset.error === "0") celsValid.push(cels[i]);
}} else if(refer === "col"){
for(let i = 0; i < cels.length; i++){
if(cels[i].dataset.col === value) celsValid.push(cels[i]);
}} else if(refer === "row"){
for(let i = 0; i < cels.length; i++){
if(cels[i].dataset.row === value) celsValid.push(cels[i]);
}} else alert("Erro!")
return celsValid;
}



function addAttributes(element, value, row, col){
element.textContent = value;
element.dataset.content = value;
element.dataset.row = row;
element.dataset.col = col;
element.dataset.error = "0";
element.setAttribute("onclick", "celClicked(this)");
if(value !== " ")
element = turnImutable(element, 1);
else element = turnImutable(element, 0);
return element;
}
function resetLights(element){

actualCel.style.backgroundColor = tableCels;

nums.forEach(function(x){
x.style.color = tableNums});
cols.forEach(function(x){
x.style.backgroundColor = tableCels;});
rows.forEach(function(x){
x.style.backgroundColor = tableCels;});

}



function turnImutable(element, state){
element.dataset.imutable = state;
return element;
}



function setLights(element, type){
resetLights(element);
if(type[0]){
nums = gerateEqualsCels(element.dataset.content, "content");
if(_STATE) 
nums.forEach(function(x){
x.style.color = "#0187fd"});
}

if(type[1]){
cols = gerateEqualsCels(element.dataset.col, "col");

rows = gerateEqualsCels(element.dataset.row, "row");
if(_STATE){
cols.forEach(function(x){
x.style.backgroundColor = "#c4edf0";});

rows.forEach(function(x){
x.style.backgroundColor = "#c4edf0"});
}
}

if(type[2]){
actualCel = element;

actualCel.style.backgroundColor = "#63c3ff";
}
}



function celClicked(element){
actualCel = element;
resetLights(element);
setLights(element, [1, 1, 1]);
if(actualCel.dataset.error === "0") deleteNum.dataset.state = "off";
else deleteNum.dataset.state = "on";
}




/* Imprime uma a tabela no documento */

function printTable(board){
let container = document.createElement("div");
container.setAttribute("class", "w-100 h-auto my-md-5");
let table = document.createElement("table");
table.setAttribute("class", `mx-auto ${background}`);
table.setAttribute("id", "table");
for (let i = 0; i < board.length; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < board[i].length; j++) {
      let cell = document.createElement('td');
      cell = addAttributes(cell, board[i][j], i, j);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
  container.appendChild(table);
  document.body.appendChild(container);

}




/* Obtém as cordenadas de um bloco de 3×3 */

function getGroupCoord(index){

let group = new Array();

for(let i = 0; i < 9; i++){
let col, row;

row = 	Math.floor(i/3)+Math.floor(index/3) * 3;

col = (i % 3) + (index % 3) * 3;

let coord = ""+row+", "+col;
group.push(coord);
}
return group;
}



/* Codifica ou decodifica a coordenada de uma célula */

function codec(coord, type){

if(type)
return parseInt(""+coord[0]+","+coord[1]);


else{
coord += "";
return [ parseInt(coord[0]), parseInt(coord[3]) ];
}
}


/* Verifica se é possível inserir um número numa célula seguindo as regras de sudoku */

function canPlaceNumber(board, row, col, num) {


  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num || board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
      return false;
    }
  }
  return true;
}



/* Preenche inicialmente a tabela com n números */

function initBoard(board, until){

for(let n = 1; n < until+1; n++)
for(let i = 0; i < 9; i++){
let count = 0;
let group = getGroupCoord(i);
while(true){
count++;
/* Tenta um milhão de vezes e termina */
if(count > 1000000) return board;

let cel = Math.ceil(Math.random()*8);
let coord = codec(group[cel], false);
if(board[coord[0]][coord[1]] !== 0)
continue;

if(!canPlaceNumber(board, coord[0], coord[1], n))
continue;

board[coord[0]][coord[1]] = n;
break;
}
}
return board;
}








/* Resolve sudoku usando o algoritmo Backtracking */

function solveSudoku() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (table[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (canPlaceNumber(table, row, col, num)) {
            table[row][col] = num;
            if (solveSudoku()) {
              return true;
            }
            table[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}






/*Cria uma tabela de sudoku preenchida com zeros */

function createSudokuTable() {
 
let board = [
[0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0],
];

return board;
}



/* Cria a barra de números */

function numbersBar(){

let div = document.createElement("div");
div.setAttribute("class", "number-container mx-auto mt-4 my-md-5 container");
for(let i = 1; i < 10; i++){
let span = document.createElement("i");
span.setAttribute("class", `bi-${i}-circle display-6`);
span.dataset.content = i;
span.dataset.state = "on";
span.setAttribute("onclick", "insertNumber(this)");

div.appendChild(span);
}

deleteNum = document.createElement("i");
deleteNum.setAttribute("class", "bi-arrow-counterclockwise display-6 display-md-5");
deleteNum.dataset.content = "0";
deleteNum.dataset.state = "off";
deleteNum.setAttribute("onclick", "removeNumber()");

div.appendChild(deleteNum);
document.body.appendChild(div);
}


function headerBar(){
const container = document.createElement("div");
container.setAttribute("class", "d-flex justify-content-evenly shadow container bg-info mt-0 py-1");
const home = document.createElement("i");
home.setAttribute("class", "bi-house icon-item display-6 text-light");
home.setAttribute("onClick", "exit(1)");
const reset = document.createElement("i");
reset.setAttribute("class", "bi-arrow-counterclockwise icon-item display-6 text-light");
reset.dataset.bsToggle = "modal";
reset.dataset.bsTarget = "#reset";
const settings = document.createElement("i");
settings.setAttribute("class", "bi-gear icon-item display-6 text-light");
settings.dataset.bsToggle = "offcanvas";
settings.dataset.bsTarget ="#settings";
[home, reset, settings].forEach(x =>{
container.appendChild(x);
});
const painel = document.createElement("div");
painel.setAttribute("class", "d-flex justify-content-evenly status-bar my-md-5");
const counter = document.createElement("span");
counter.setAttribute("id", "counter");
counter.setAttribute("class", "text-info display-md-3");
const errors = document.createElement("span");
errors.setAttribute("id", "errors");
errors.setAttribute("class", "text-danger");
painel.appendChild(counter);
painel.appendChild(errors);
document.body.appendChild(container);
document.body.appendChild(painel);
}

