console.log("I am linked")

var currentQuestionIndex = 0
var questionContainer = document.getElementById("questionContainer");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("startBtn");
var initialsElement = document.getElementById("initials");


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


function strtQuiz() {
    var startScreenElement = document.getElementById("startScreen");
    startScreenElement.setAttribute("class","hide");
    questionContainer.removeAttribute("class");
    getQuestion();
}

function getQuestion() {
    console.log("get question button pressed")
    var currentQuestion = questions[currentQuestionIndex];
    var questionTitle = document.getElementById("questionText");
    questionTitle.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = nextQuestionClick;
        choicesElement.appendChild(choiceBtn);

    });
}

function nextQuestionClick () {
    currentQuestionIndex++
}


// if else statement for right or wrong




// starts quiz when start quiz button is pressed
startBtn.addEventListener("click", strtQuiz);