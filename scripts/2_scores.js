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

let tableBody = document.querySelector("tbody");
let usersList = JSON.parse(localStorage.getItem("quizScores")) || [];

// Functions
function showUsers(usersArray, output) {
    output.innerHTML = usersArray.sort((a,b) => b.score - a.score).map(user => { 
        return `
        <tr>
            <td>${user.name}</td>
            <td>${user.score}</td>
            <td>${user.time}</td>
            <td>${user.theme}</td>
        </tr>
        `
    }).join("");
};



// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();

// Events
showUsers(usersList, tableBody);

