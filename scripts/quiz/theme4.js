// Variables
// import theme1Btn from '../1_themes'
// const theme1Btn = document.querySelector('#theme1-btn');
// const theme2Btn = document.querySelector('#theme2-btn');
// const theme3Btn = document.querySelector('#theme3-btn');
// const theme4Btn = document.querySelector('#theme4-btn');

const introText = document.querySelector('.container__text')
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const quizQuestionElement = document.querySelector("#quiz__question");
const questionElement = document.querySelector("#question");
const answerBtnsElement = document.querySelector("#answers-btns");
const saveBtn = document.querySelector("#save-btn");
const resultElement = document.querySelector('#result');
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const scoresTable = document.querySelector(".table-container");
const infoText = document.querySelector('.info');
const timeContainer = document.querySelector('.time');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');

let questions = [];
let index;
let score;
let themeType = 'React';
let questionNumber;
let scoresArr = [];

let tableBody = document.querySelector("tbody");
let usersList2 = JSON.parse(localStorage.getItem("quizScores")) || [];


// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
  
//     return array;
// }
// console.log(theme1Btn)

// function showTheme1Questions() {

// }

fetch("../../4themeQuestions.json")
.then((response) => response.json())
.then((data) => {
    questions.push(...data);

    // questions.push(shuffle(data));
    // console.log(shuffle(data))
});




// Functions
function startGame() {
    showTimer();
    introText.classList.add('hide')
    startBtn.classList.add("hide");
    saveBtn.classList.add("hide");
    infoText.classList.add("hide");
    quizQuestionElement.classList.remove("hide");
    timeContainer.classList.remove('hide')
    progress.classList.remove('hide')

    index = 0;
    score = 0;
    questionNumber = 0;
    setNextQuestion();    
    resultElement.classList.add('hide');
    progressBar.style.width = '0%';

    if(timeContainer.childElementCount > 1) {
        timeContainer.removeChild(timeContainer.firstChild)
    }


    for (i = 0; i < usersList2.length; i++) {
        scoresArr.push(usersList2[i].score)
    }
    console.log(Math.max(...scoresArr))
}


function setNextQuestion() {
    resetState();
    showQuestion(questions[index]);
    questionNumber++;
    
}

// Time counting
function showTimer() {
    const time = document.createElement('p');
    time.classList.add('time');
    time.innerText = '00:00';
    timeContainer.appendChild(time);

    let startTime = 0;


    setInterval(() => {
        if(questions.length > index) {
            ++startTime;
        } 

        if (questionNumber === questions.length && startBtn.innerText === "Restart") {
            return;
        }
 
        let minutes = Math.floor(startTime / 60);
        let seconds = startTime - minutes * 60;
        if(minutes < 10) {
            if(seconds < 10) {
                time.innerText = `0${minutes}:0${seconds}`;
            } else if (seconds < 60) {
                time.innerText = `0${minutes}:${seconds}`
            }
        } else {
            if (seconds < 10) {
                time.innerText = `${minutes}:0${seconds}`
            } else if (seconds < 60) {
                time.innerText = `${minutes}:${seconds}`
            }
        }
    }, 1000)

}

function showRecord() {
    let currentMaxScore = Math.max(...scoresArr)
    console.log(score)

    if(score > currentMaxScore) {
        document.querySelector('.record').classList.remove('hide');
    }
}

function selectAnswer(e) {
    let correct = e.target.dataset.correct;
    let btns = document.querySelectorAll(".btn-answ");

    if (correct) {
        e.target.classList.add('correct');
        score++;

      } else {
        e.target.classList.add('wrong');
      }

    if(questions.length > index + 1) {
        nextBtn.classList.remove("hide");
        
    } else {
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
        saveBtn.classList.remove("hide");

        resultElement.classList.remove('hide');
        resultElement.innerText = `Correct answers: ${score} from ${questions.length} questions`;
        showRecord();
    }

    for (btn of btns) {
        btn.disabled = true;
    }

    // // Progress 
    progressBar.style.width = `${(questionNumber / questions.length) * 100}%`;



}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("btn-answ");
        button.innerText = answer.text;
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        };
       
        button.addEventListener("click", selectAnswer);
        answerBtnsElement.appendChild(button);

    })
}

function resetState() {
    nextBtn.classList.add("hide");

    while(answerBtnsElement.firstChild) {
        answerBtnsElement.removeChild(answerBtnsElement.firstChild);
    }
}


function showNextQuestion() {
    index++;
    setNextQuestion();
}


// Score table
function showScoreTable() {
    form.classList.remove("hide");
    saveBtn.classList.add("hide");
    resultElement.classList.add("hide");
    quizQuestionElement.classList.add("hide");
    startBtn.classList.add("hide");
    timeContainer.classList.add('hide');
    progress.classList.add('hide')
}

function addUser(e) {
    e.preventDefault();
    startBtn.classList.remove("hide");


    let user = {
        name: nameInput.value,
        score: score,
        time: document.querySelector('.time').innerText,
        theme: themeType
    }

    usersList2.push(user);
    localStorage.setItem("quizScores", JSON.stringify(usersList2));

    // Clearing inputs after submit
    nameInput.value = "";
    score = "";

    form.classList.add('hide');
    // timeContainer.classList.add('hide');

    window.location='../../pages/2_scores.html'
};



// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();

// Events

// theme1Btn.addEventListener('click', showTheme1Questions)



startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", showNextQuestion);
saveBtn.addEventListener("click", showScoreTable);
form.addEventListener("submit", addUser);



