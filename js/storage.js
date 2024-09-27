
function gameOn(state){
localStorage.gameOn = state;
}

function getGameOn(){
return localStorage.gameOn;
}

function setLevel(level){
localStorage.level = level;
}

function getLevel(){
return localStorage.level;
}

function setTime(value){
localStorage.count = value;
}

function getTime(){
return localStorage.count;
}

function setLastGame(board, playBoard){
localStorage.lastGame = JSON.stringify(board);
localStorage.lastPlayGame = JSON.stringify(playBoard);
}

function getLastGame(){
if(!localStorage.lastGame) return false;
return [JSON.parse(localStorage.lastGame), JSON.parse(localStorage.lastPlayGame)];
}

function setColors(mode){
localStorage.nightMode = mode;
if(mode){
localStorage.color = JSON.stringify({tableNums: "#f8f9fa", tableCels: "#212529", background: "bg-dark text-light"});
}else{
localStorage.color = JSON.stringify({tableNums: "#212529", tableCels: "#f8f9fa", background: "bg-light text-dark"});
}
}

function getColors(){
if(!localStorage.color) setColors(false);
return JSON.parse(localStorage.color);
}


function setRecordTime(level, time){
if(level == 0){
localStorage.easyRecord = time;
let data = new Date();
localStorage.easyData = JSON.stringify(data.toLocaleDateString());
}else if(level == 1){
localStorage.normalRecord = time;
let data = new Date();
localStorage.normalData = JSON.stringify(data.toLocaleDateString());
}else if(level == 2){
localStorage.hardRecord = time;
let data = new Date();
localStorage.hardData = JSON.stringify(data.toLocaleDateString());
}
}

function getRecordTime(level){
if(level == 0){
if(!localStorage.easyRecord)
return [0, 0, 0];
let time = localStorage.easyRecord;
return [`${Math.floor(time/60)} : ${time%60}`, JSON.parse(localStorage.easyData), time];
}else if(level == 1){
if(!localStorage.normalRecord)
return [0, 0, 0];
let time = localStorage.normalRecord;
return [`${Math.floor(time/60)} : ${time%60}`, JSON.parse(localStorage.normalData), time];
}else if(level == 2){
if(!localStorage.hardRecord)
return [0, 0, 0];
let time = localStorage.hardRecord;
return [`${Math.floor(time/60)} : ${time%60}`, JSON.parse(localStorage.hardData), time];
}
}

function deleteAllData(){
localStorage.clear();
exit(0);
}

function setInterativeMode(mode){
localStorage.interativeMode = mode;
}

function getInterativeMode(){
return localStorage.interativeMode;
}

function setNightMode(mode){
localStorage.nightMode = mode;
}
function getNightMode(){
return localStorage.nightMode;
}

function setError(error){
localStorage.error = error;
}

function getError(){
if(!localStorage.error) setError(0);
return localStorage.error;
}

function setSongState(mode){
localStorage.songs = mode;
}

function getSongState(){
return localStorage.songs;
}