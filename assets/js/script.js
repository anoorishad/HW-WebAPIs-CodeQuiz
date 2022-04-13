
var currentQuestionIndex = 0
var startScreenElement = document.getElementById("startScreen");
var questionContainer = document.getElementById("questionContainer");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startBtn");
var initialsElement = document.getElementById("initials");
var endScreen = document.getElementById("endContainer");
var scoreScreen = document.getElementById("scoreContainer");
var finalScore = document.getElementById("finalScore");
var restartBtn = document.getElementById("restart");
// var timeContainer = document.getElementById("timer");

var timerID;
var timeLeft = document.getElementById("timeLeft");




var time = questions.length * 15

function clock() {

    time--;
    timeLeft.textContent = time;
    if (time <= 0) {
        endQuiz();
    };
}


function strtQuiz() {

    startScreenElement.setAttribute("class","hide");
    questionContainer.removeAttribute("class");
    timerID = setInterval(clock, 1000);
    timeLeft.textContent = time;

    getQuestion();
}


function getQuestion() {
    console.log("get question button pressed")
    var currentQuestion = questions[currentQuestionIndex];
    var questionTitle = document.getElementById("questionText");
    questionTitle.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function(choiceP, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choiceP);
        choiceBtn.textContent = i + 1 + ". " + choiceP;
        choiceBtn.onclick = nextQuestionClick;
        choicesElement.appendChild(choiceBtn);

    });
}

function nextQuestionClick () {

    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time=0
        }
        timeLeft.textContent = time
    }
    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    }
    else {
        getQuestion();
    }

}

function endQuiz () {
    clearInterval(timerID);
    endScreen.removeAttribute("class");
    questionContainer.setAttribute("class","hide");
    finalScore.textContent = time
    submitBtn.addEventListener("click" , showScores);


}

function saveScores() {
    var initials = initialsElement.value.trim()
    if (initials !== "") {
        var scores = JSON.parse(window.localStorage.getItem("scores")) || [];


        var scoreObject = {
            score: time,
            initials: initials
        }

        scores.push(scoreObject);
        window.localStorage.setItem("scores", JSON.stringify(scores));
    }
}


function showScores() {
    scoreScreen.removeAttribute("class");
    saveScores();

    var highScores = JSON.parse(window.localStorage.getItem("scores")) || [];

    highScores.sort(function(a,b) {
        return b.score - a.score;
    });

    highScores.forEach(i => {
        var listItem = document.createElement("li");
        listItem.textContent = i.initials + ": " + i.score;
        var list  = document.getElementById("list");
        list.appendChild(listItem)
        
    });


}

function clearScores() {
    window.localStorage.removeItem("scores")
    window.location.reload();
}
document.getElementById("clearScores").onclick = clearScores;

function restartGame() {
    scoreScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide" );
    startScreenElement.removeAttribute("class");
    currentQuestionIndex = 0


    time = questions.length * 15;


}


// starts quiz when start quiz button is pressed
startBtn.onclick=strtQuiz;
restartBtn.onclick=restartGame;

console.log(currentQuestionIndex);







