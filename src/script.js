let chicks = Math.floor(Math.random() * 51) + 50;
let input = document.querySelector("#guess");
let checkBtn = document.querySelector("#check-btn");
let result = document.querySelector("#result");
let previousGuess = document.getElementById('prev-guesses');
let remaining = document.getElementById('rem-guesses');
let startOVerBtn = document.getElementById('start-over')

let prevGuessArr = [];
let remainingCount = 5;
let canPlay = true;

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let userGuess = parseInt(input.value);
    if(isNaN(userGuess)){
        result.innerHTML = `Please enter any number between 1~100`;
    }else{
        if(canPlay){
            checkMatch(userGuess);
        }else{
            createStartOverBtn();
        }
    } 
});

function checkMatch(userGuess) {
    if(userGuess === chicks) {
        result.innerHTML = `Wow! You guessed the correct! Neta has ${chicks} chicks.`;
        input.setAttribute('disabled','');
        checkBtn.setAttribute('disabled','');
        createStartOverBtn();
    }else{
        predictGuessLevel(userGuess);
        addToPrev(userGuess);
        remainingCount--;
        if(remainingCount>0){
            changeRemaining(remainingCount);
        }else if(remainingCount==0){
            //making the input filed disable
            input.setAttribute('disabled','');
            checkBtn.setAttribute('disabled','');
            changeRemaining(remainingCount);
            canPlay = false;
            createStartOverBtn();
        }
        
    }
}
function predictGuessLevel(userGuess){
    if((chicks-userGuess) > 5){
        result.innerHTML = `You are guessing too low!`;
    }else if((chicks-userGuess) < -5){
        result.innerHTML = `You are guessing too high!`;
    }else{
        result.innerHTML = `You are guessing so close!`;
    }
}
function addToPrev(userGuess){
    prevGuessArr.push(userGuess);
    previousGuess.innerHTML = `${prevGuessArr.toString()}`;
}
function changeRemaining(remainingCount){
    remaining.innerHTML = `${remainingCount}`;
    input.value = '';
}
function createStartOverBtn(){
    input.value = '';
    startOVerBtn.style.display = 'inline';
    input.removeAttribute('disabled');
    checkBtn.removeAttribute('disabled');
    startOVerBtn.addEventListener('click',()=>{
        previousGuess.innerHTML = '';
        remaining.innerHTML = 5;
        prevGuessArr = [];
        remainingCount = 5;
        canPlay = true;
        startOVerBtn.style.display = 'none';
    });
    
}