console.log("I am linked")

var currentQuestionIndex = 0
var questionContainer = document.getElementById("questionContainer");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startBtn");
var initialsElement = document.getElementById("initials");
var endScreen = document.getElementById("endContainer");
var totalPoints = 0

var timerID;
var timeLeft = document.getElementById("timeLeft");

// array containing question objects with choices and appropriate answers
var questions = [
    {
        title: "Question 1",
        choices: [
            "optionA",
            "optionB",
            "optionC",
            "optionD",
        ],
        answer:  "optionB"
    },
    {
        title: "Question 2",
        choices: [
            "optionA",
            "optionB",
            "optionC",
            "optionD",
        ],
        answer:  "optionB"
    },
    {
        title: "Question 3",
        choices: [
            "optionA",
            "optionB",
            "optionC",
            "optionD",
        ],
        answer:  "optionB"
    },
    {
        title: "Question 4",
        choices: [
            "optionA",
            "optionB",
            "optionC",
            "optionD",
        ],
        answer:  "optionB"
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
    else {
        totalPoints += 1;

    }

    currentQuestionIndex++
    if (currentQuestionIndex === questions.length) {
        console.log("WE made it here");
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
    

}

// starts quiz when start quiz button is pressed
startBtn.addEventListener("click", strtQuiz);







