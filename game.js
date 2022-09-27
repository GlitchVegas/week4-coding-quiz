//Questions for the Quiz
var questions = [
    {
        title:"String values must be enclosed within __ when being assigned to variables.",
        choices:["Quotes","Brackets","Commas","Parentheses"],
        answer:"Quotes",
    },
    {
        title:"The condition in an if / else statement is enclosed within __.",
        choices:["Curly Brackets","Parentheses","Quotes","Square Brackets"],
        answer:"Parentheses",
    },
    {
        title:"Arrays in Javascript can be used to store ___.",
        choices:["Booleans","Numbers and Strings","Other Arrays","All of the Above"],
        answer:"All of the Above",
    },
    {
        title:"A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices:["Bash","For Loops","Console Log","Javascript"],
        answer:"Console Log",
    },
    {
        title:"Commonly used data types DO NOT include:",
        choices:["Numbers","Booleans","Strings","Alerts"],
        answer:"Alerts",
    },
];

//var for the score
var score = 0;

//var for question index
var questionIndex = 0;

//vars for querySelectors
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

//var for the Time Limit/Scoring
var secondsLeft = 150;

//var for new Ul element
var ulCreate = document.createElement("ul");

//var for penalty for wrong answer
var penalty = 15;

//var for Interval for game to begin
var interval = 0;

//Listener for clicks on the button
timer.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(interval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Rendering Quiz 
function render(questionIndex) {
    //Clearing text from html
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    //loop through questions and setting the text
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Making sure the choices match the answer or not
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "You Got the Answer Right!!:  " + questions[questionIndex].answer; 
        } else {
            //-5 penalty for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Unlucky the right answer was:  " + questions[questionIndex].answer;
        }

    }
    // Next Question
    questionIndex++;
    //moving to stats page
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";
    //adds heading back in
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);
    //adds paragraph back in
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    //make the time remaining into score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }
    //adds label for text box
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
    questionsDiv.appendChild(createLabel);
    //add input for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);
    //add submit button to keep highscore
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);
    //adds local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            //Resets the quiz
            location.reload();
        }
    });

}

var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");

//clear scores button 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
//gets local stroage scores
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
};