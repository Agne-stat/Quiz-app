// Variables
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

let questions = [];
let index;
let score;
let newArray = []

let tableBody = document.querySelector("tbody");
let usersList = JSON.parse(localStorage.getItem("quizScores")) || [];

// Functions
showUsers(usersList, tableBody);

function showUsers(usersArray, output) {
    // shorting by score
    usersArray.sort((a,b) => {
      // comparing by time
        if(a.score === b.score) {
            var x = a.time,
              y = b.time;
              if(x>y){
                return 1;
              }else{
                return -1;
              }
          }
        return b.score-a.score
    })

    output.innerHTML = usersArray.map(user => {
        return `
            <tr>
                <td>${user.name}</td>
                <td>${user.score}</td>
                <td>${user.time}</td>
                <td>${user.theme}</td>
            </tr>
        `
    }).join("")
}


// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();



