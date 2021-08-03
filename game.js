var possibleChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
var playerName;
var playerChoice;
var computerChoice; 
var monitorText = document.getElementById("monitorText");
var playerScore;
var pScore = document.getElementById("pScore");
var computerScore;
var cScore = document.getElementById("cScore");
var playerStartScore = 0;
var computerStartScore = 0;
var timer;
var playerRounds;
var pRounds = document.getElementById("pRounds");
var computerRounds;
var cRounds = document.getElementById("cRounds");
var playerStartRounds = 0;
var computerStartRounds = 0;
var totalRounds;
var tRounds = document.getElementById("tRounds");
var totalStartRounds = 1;

$(document).ready(function(){
    $("#newModal").modal("show");
    var field = document.querySelector('[name="user"]');
    field.addEventListener('keypress', function ( event ) {  
        var key = event.keyCode;
         if (key === 32) {
           event.preventDefault();
           alert("No spaces allowed!");
        } 
    });
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

document.getElementById("submitButton").onclick = passOnName; 
document.getElementById("rock").onclick= playedRock;
document.getElementById("paper").onclick= playedPaper;
document.getElementById("scissors").onclick= playedScissors;
document.getElementById("lizard").onclick= playedLizard;
document.getElementById("spock").onclick= playedSpock;

function passOnName() {
    playerName = document.getElementById("userInput").value;
    document.getElementById("playerTag").innerHTML = playerName;
    if(playerName == "") {
        alert("Your name is required.");
    } else {
        $("#newModal").modal("hide");
    }
}

function playedRock() {
    stop();
    playerChoice = "Rock";
    computerChoice = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    monitorText.innerHTML = "You played " + playerChoice + ".";
    monitorText.innerHTML += "<br>Sheldon played " + computerChoice + ".";
    if(computerChoice === playerChoice) {
        monitorText.innerHTML += "<br><span style='color:yellow'>Draw! Nobody won.</span>";
    } else if(computerChoice === "Spock" || computerChoice === "Paper") {
        computerScore = computerStartScore;
        computerScore += 1;
        monitorText.innerHTML += "<br>" + computerChoice + " beats " + playerChoice + ".<br><span style='color:red'>You lost!</span>";
        cScore.innerHTML = computerScore;
        computerStartScore = computerScore; 
    } else {
        playerScore = playerStartScore;
        playerScore += 1;
        monitorText.innerHTML += "<br>" + playerChoice + " beats " + computerChoice + ".<br><span style='color:green'>You won!</span>";
        pScore.innerHTML = playerScore;
        playerStartScore = playerScore; 
    } 
    checkScores();
    timer = setTimeout(function(){ monitorText.innerHTML = ""; }, 4000);
}

function playedPaper() {
    stop();
    playerChoice = "Paper";
    computerChoice = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    monitorText.innerHTML = "You played " + playerChoice + ".";
    monitorText.innerHTML += "<br>Sheldon played " + computerChoice + ".";
    if(computerChoice === playerChoice) {
        monitorText.innerHTML += "<br><span style='color:yellow'>Draw! Nobody won.</span>";
    } else if(computerChoice === "Scissors" || computerChoice === "Lizard") {
        computerScore = computerStartScore;
        computerScore += 1;
        monitorText.innerHTML += "<br>" + computerChoice + " beats " + playerChoice + ".<br><span style='color:red'>You lost!</span>";
        cScore.innerHTML = computerScore;
        computerStartScore = computerScore; 
    } else {
        playerScore = playerStartScore;
        playerScore += 1;
        monitorText.innerHTML += "<br>" + playerChoice + " beats " + computerChoice + ".<br><span style='color:green'>You won!</span>";
        pScore.innerHTML = playerScore;
        playerStartScore = playerScore; 
    } 
    checkScores();
    timer = setTimeout(function(){ monitorText.innerHTML = ""; }, 4000);
}

function playedScissors() {
    stop();
    playerChoice = "Scissors";
    computerChoice = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    monitorText.innerHTML = "You played " + playerChoice + ".";
    monitorText.innerHTML += "<br>Sheldon played " + computerChoice + ".";
    if(computerChoice === playerChoice) {
        monitorText.innerHTML += "<br><span style='color:yellow'>Draw! Nobody won.</span>";
    } else if(computerChoice === "Spock" || computerChoice === "Rock") {
        computerScore = computerStartScore;
        computerScore += 1;
        monitorText.innerHTML += "<br>" + computerChoice + " beats " + playerChoice + ".<br><span style='color:red'>You lost!</span>";
        cScore.innerHTML = computerScore;
        computerStartScore = computerScore; 
    } else {
        playerScore = playerStartScore;
        playerScore += 1;
        monitorText.innerHTML += "<br>" + playerChoice + " beats " + computerChoice + ".<br><span style='color:green'>You won!</span>";
        pScore.innerHTML = playerScore;
        playerStartScore = playerScore; 
    }
    checkScores();
    timer = setTimeout(function(){ monitorText.innerHTML = ""; }, 4000);
}

function playedLizard() {
    stop();
    playerChoice = "Lizard";
    computerChoice = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    monitorText.innerHTML = "You played " + playerChoice + ".";
    monitorText.innerHTML += "<br>Sheldon played " + computerChoice + ".";
    if(computerChoice === playerChoice) {
        monitorText.innerHTML += "<br><span style='color:yellow'>Draw! Nobody won.</span>";
    } else if(computerChoice === "Scissors" || computerChoice === "Rock") {
        computerScore = computerStartScore;
        computerScore += 1;
        monitorText.innerHTML += "<br>" + computerChoice + " beats " + playerChoice + ".<br><span style='color:red'>You lost!</span>";
        cScore.innerHTML = computerScore;
        computerStartScore = computerScore; 
    } else {
        playerScore = playerStartScore;
        playerScore += 1;
        monitorText.innerHTML += "<br>" + playerChoice + " beats " + computerChoice + ".<br><span style='color:green'>You won!</span>";
        pScore.innerHTML = playerScore;
        playerStartScore = playerScore; 
    }
    checkScores();
    timer = setTimeout(function(){ monitorText.innerHTML = ""; }, 4000);
}

function playedSpock() {
    stop();
    playerChoice = "Spock";
    computerChoice = possibleChoices[Math.floor(Math.random()*possibleChoices.length)];
    monitorText.innerHTML = "You played " + playerChoice + ".";
    monitorText.innerHTML += "<br>Sheldon played " + computerChoice + ".";
    if(computerChoice === playerChoice) {
        monitorText.innerHTML += "<br><span style='color:yellow'>Draw! Nobody won.</span>";
    } else if(computerChoice === "Lizard" || computerChoice === "Paper") {
        computerScore = computerStartScore;
        computerScore += 1;
        monitorText.innerHTML += "<br>" + computerChoice + " beats " + playerChoice + ".<br><span style='color:red'>You lost!</span>";
        cScore.innerHTML = computerScore;
        computerStartScore = computerScore; 
    } else {
        playerScore = playerStartScore;
        playerScore += 1;
        monitorText.innerHTML += "<br>" + playerChoice + " beats " + computerChoice + ".<br><span style='color:green'>You won!</span>";
        pScore.innerHTML = playerScore;
        playerStartScore = playerScore; 
    }
    checkScores();
    timer = setTimeout(function(){ monitorText.innerHTML = ""; }, 4000);
}

function checkScores() {
    if (playerScore == 10 || computerScore == 10) {
        if(playerScore == 10) {
            alert("Finished! You won the game. Click OK to play another round.");
            reset();
            playerRounds = playerStartRounds;
            playerRounds += 1;
            pRounds.innerHTML = playerRounds;
            playerStartRounds = playerRounds; 
            totalRounds = totalStartRounds;
            totalRounds += 1;
            tRounds.innerHTML = totalRounds;
            totalStartRounds = totalRounds; 
        } else if(computerScore == 10) {
            alert("Finished! Sheldon won. Click OK to play another round.");
            reset();
            computerRounds = computerStartRounds;
            computerRounds += 1;
            cRounds.innerHTML = computerRounds;
            computerStartRounds = computerRounds; 
            totalRounds = totalStartRounds;
            totalRounds += 1;
            tRounds.innerHTML = totalRounds;
            totalStartRounds = totalRounds; 
        }
    }
}

function stop() {
    if (timer) {
        clearTimeout(timer);
        timer = 0;
    }
}

function reset() {
    playerScore = 0;
    playerStartScore = 0;
    pScore.innerHTML = "0";
    computerScore = 0;
    computerStartScore = 0;
    cScore.innerHTML = "0";
    monitorText.innerHTML = "";
}

function resetAll() {
    playerScore = 0;
    playerStartScore = 0;
    pScore.innerHTML = "0";
    computerScore = 0;
    computerStartScore = 0;
    cScore.innerHTML = "0";
    monitorText.innerHTML = "";
    playerRounds = 0;
    playerStartRounds = 0;
    pRounds.innerHTML = "0";
    computerRounds = 0;
    computerStartRounds = 0;
    cRounds.innerHTML = "0";
    totalRounds = 0;
    totalStartRounds = 1;
    tRounds.innerHTML = "1";
}




