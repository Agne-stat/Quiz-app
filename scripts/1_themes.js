// Variables
const theme1Info = document.querySelector('.theme1__info');
const theme2Info = document.querySelector('.theme2__info');
const theme3Info = document.querySelector('.theme3__info');
const theme4Info = document.querySelector('.theme4__info');

let usersList2 = JSON.parse(localStorage.getItem("quizScores")) || [];
let newArr1 = [];
let newArr2 = [];
let newArr3 = [];
let newArr4 = [];

// Functions
function getMaxScores() {
    newArr1 = usersList2.filter(user => user.theme === 'HTML and CSS');
    newArr2 = usersList2.filter(user => user.theme === 'JavaScript');
    newArr3 = usersList2.filter(user => user.theme === 'Node.js');
    newArr4 = usersList2.filter(user => user.theme === 'React');


    newArr1.sort((a,b) => b.score-a.score);
    newArr2.sort((a,b) => b.score-a.score);
    newArr3.sort((a,b) => b.score-a.score);
    newArr4.sort((a,b) => b.score-a.score);

    // showing max score
    if (!newArr1[0].score) {
        theme1Info.innerHTML = `There is no score`
    } else {
        theme1Info.innerHTML = `Current max score ${newArr1[0].score}`
    }

    if (newArr2.length === 0) {
        theme2Info.innerHTML = `There is no score`
    } else {
        theme2Info.innerHTML = `Current max score ${newArr2[0].score}`
    }

    if (newArr3.length === 0) {
        theme3Info.innerHTML = `There is no score`
    } else {
        theme3Info.innerHTML = `Current max score ${newArr3[0].score}`
    }

    if (newArr4.length === 0) {
        theme4Info.innerHTML = `There is no score`
    } else {
        theme4Info.innerHTML = `Current max score ${newArr4[0].score}`
    }

}

// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();

// Events
window.addEventListener('DOMContentLoaded', getMaxScores);
