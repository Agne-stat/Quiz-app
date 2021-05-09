// Variables
const startBtn = document.querySelector('.start__btn');
let random = Math.floor(Math.random()*4) + 1;

// Functions
// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();

//Events
// start button - random theme
startBtn.addEventListener('click', () => {
    window.location = `./pages/quiz/theme${random}.html`
})
