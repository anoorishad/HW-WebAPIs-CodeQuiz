
var currentQuestionIndex = 0
var questionContainer = document.getElementById("questionContainer");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startBtn");
var initialsElement = document.getElementById("initials");
var endScreen = document.getElementById("endContainer");
var scoreScreen = document.getElementById("scoreContainer");
var finalScore = document.getElementById("finalScore");

var timerID;
var timeLeft = document.getElementById("timeLeft");

// array containing question objects with choices and appropriate answers
var questions = [
    {
        title: "Which of these is NOT a programming language?",
        choices: [
            "Java",
            "Banana",
            "Python",
            "Ruby",
        ],
        answer:  "Banana"
    },
    {
        title: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        choices: [
            "Arrays",
            "Function",
            "Variables",
            "Strings",
        ],
        answer:  "Arrays"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: [
            "<javascript>",
            "<js>",
            "<script>",
            "<scripting>",
        ],
        answer:  "<script>"
    },
    {
        title: "Which of the following function of String object extracts a section of a string and returns a new string?",
        choices: [
            "slice()",
            "split()",
            "replace()",
            "osearch()",
        ],
        answer:  "slice()"
    }
];
var time = questions.length * 15

function strtQuiz() {
    var startScreenElement = document.getElementById("startScreen");
    startScreenElement.setAttribute("class","hide");
    questionContainer.removeAttribute("class");
    timerID = setInterval(clock, 1000);
    timeLeft.textContent = time

    getQuestion();
}
function clock() {
    time--;
    timeLeft.textContent = time;
    if (time <= 0) {
        endQuiz();
    };
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


// starts quiz when start quiz button is pressed
startBtn.addEventListener("click", strtQuiz);







