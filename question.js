const form = document.querySelector('.container');
const question = document.querySelector('.word');
const answer = document.querySelector('.answer');
const nextBtn = document.querySelector('.next');
const timer = document.querySelector('.time');
const playBtn = document.querySelector('.play');
const scores = document.querySelector('.score');
const overMsg = document.querySelector('.msg');
const stopBtn = document.querySelector('.stopBtn');
const GAME_TIME = 10;
let isPlaying = false;
var score = 0;
var time = GAME_TIME;
let timeInterval;

const setQuiz = () => {
    const randIndex = Math.floor(Math.random()* words.length);
    var quiz = words[randIndex];
    question.innerHTML = quiz.name;
    //buttonChange("게임시작");
}
buttonChange("게임시작");

nextBtn.addEventListener( "click" ,() => {
    if(answer.value == question.innerHTML) {
        answer.value = "";
        answer.focus();
        score += 100;
    } 
    else {
        alert("틀렸습니다");
        answer.value = "";
        answer.focus(); 
    }
    setQuiz();
    scores.innerHTML = score;
    time=GAME_TIME;
}) 

function playing() {
    if(isPlaying) {
        return;
    }
    setQuiz();
    isPlaying = true;
    time = GAME_TIME;
    answer.focus();
    overMsg.innerHTML = "";
    
    scores.innerHTML = 0;
    timeInterval = setInterval(countDown , 1000);
    checkInterval = setInterval(GameOver , 50);
    buttonChange("게임중...");
}

function GameOver() {
    if(!isPlaying && time == 0) {
        overMsg.innerHTML = "Game Over!!"
        //score = 0;
        buttonChange("게임시작")
        clearInterval(checkInterval)
    }
}


function countDown() {
    time > 0 ? time-- : isPlaying =false;
    if(!isPlaying) {
        clearInterval(timeInterval);
    }
    timer.innerHTML = time;
}

function buttonChange(text) {
    playBtn.innerHTML = text;
    text === "게임시작" ? playBtn.classList.remove('playing') : playBtn.classList.add('playing');
}
playBtn.addEventListener('click' , playing);

form.addEventListener('submit' , (e)=> {
    e.preventDefault();
    if(answer.value == question.innerHTML) {
        answer.value = "";
        answer.focus();
        score += 100;
    } 
    else {
        alert("틀렸습니다");
        answer.value = "";
        answer.focus(); 
    }
    setQuiz();
    scores.innerHTML = score;
    time=GAME_TIME;
})

stopBtn.addEventListener('click' , ()=> {
    if(isPlaying === true) {
        clearInterval(timeInterval);
        isPlaying= false;
        answer.readOnly = true;
        stopBtn.innerHTML = "재시작";
        stopBtn.classList.add('active');
    } else {
        isPlaying = true;
        answer.readOnly = false;
        answer.focus();
        timeInterval = setInterval(countDown , 1000);
        stopBtn.innerHTML = "일시정지";
        stopBtn.classList.remove('active');
    }
})

