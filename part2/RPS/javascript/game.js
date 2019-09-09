//--------------------------------------------//

var particles = [];
var alreadyRendering = false;

// originally from Rachel Smith on CodePen https://codepen.io/rachsmith/pen/oXBOwg
/* global particles */
function sparkShower(startx, starty, sparkWidth, sparkHeight) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = sparkWidth;
  var height = canvas.height = sparkHeight;
//   var colors = ['#AF4A0D', '##FFD064', '#FEFFFD'];
    var colors = ['#FFFFFF','#DE0D0D','#ECBD0E','#6F8A9A'];
  // this is only used for simple gravity
  var gravity = 0.08;
  //var particles = [];
  var floor = sparkHeight;
  var currentlySparking = false;
  var maxSize = 10;
  // This is the acceleration of Gravity in m/s.
  var ag = 9.81;

  function initParticles() {
    currentlySparking = true;
    for (var i = 0; i < 400; i++) {
      setTimeout(function() {
        createParticle(i);
        createParticle(i * 3);
      }, i);
    }
  }

  function createParticle(i) {
    // initial position in middle of canvas
    var x = startx;
    var y = starty;
    var z = (Math.random() * 2);
    // randomize the vx and vy a little - but we still want them flying 'up' and 'out'
    var maxex = Math.random() * 20;
    var vx = (Math.random() * maxex) - (maxex / 2);
    var vy = (Math.random() * -20);
    // velocity size?
    var vsize = 0;
    // randomize size and opacity a little & pick a color from our color palette
    var size = 0.7 + Math.random();
    var color = colors[Math.floor(Math.random() * colors.length)];
    var opacity = 0.5 + Math.random() * 0.5;
    var d = new Date();
    var startTime = d.getTime();
    var p = new Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, startTime);
    p.finished = false;
    particles.push(p);
  }

  function Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, lastTime) {

    function reset() {
      opacity = 0;
      this.finished = true;
    }

    this.update = function() {
      // if a particle has faded to nothing we can reset it to the starting position
      if (opacity - 0.0005 > 0) opacity -= 0.0005;
      else reset();
      // simple gravity
      //vy += gravity;
      var d = new Date();
      var timeNow = d.getTime();
      // Calculate gravity based on time elapsed since last update in lastTime
      // Pixels per "Meter" = 4735 = 4.7
      // Velocity of Y = Acceleration of Gravity in meters per second * number of seconds since last calc * pixels-per-meter
      if (timeNow > lastTime)
        vy += (ag * ((timeNow - lastTime) / 1000) * 4.7);
      lastTime = timeNow;
      x += vx;
      y += vy*1.8;
      if (y > (floor + 100)) this.finished = true;
      if (size < maxSize) size += vsize * z;
      if ((opacity < 0.5) && (y < floor)) {
        vsize = 0.55 - opacity;
      } else {
        vsize = 0;
      }
      // add bouncing off the floor
      if (y > floor) {
        vy = vy * -0.04;
        vx = vx * 0.95;
      }
    };

    this.draw = function() {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      //ctx.fillRect(x, y, size, size);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function render() {
    alreadyRendering = true;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      if (typeof particles[i] !== "undefined") {
        if (particles[i].finished === true) {
          particles.splice(i, 1);
        } else {
          particles[i].update();
          particles[i].draw();
        }
      }
    }
    requestAnimationFrame(render);
  }

  // resize
  window.addEventListener('resize', resize);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // init
  initParticles();
  if (!alreadyRendering)
    render();
}

function infoButtonClick1() {
    console.log("In Button 1 firework");
    let button = $(".rock")[0].getBoundingClientRect()
    var x = button.x + ( button.width / 2 )
    var y = button.y + ( button.height / 2)
    
  var sparkCanvas = $('#canvas');
  var sparkWidth = sparkCanvas.width();
  var sparkHeight = sparkCanvas.height();
  console.log("Button 1 - x: ", x, ", y: ", y, ", width: ", sparkWidth, ", height: ", sparkHeight)
  console.log(button.x, button.width)
//   console.log(sparkWidth, sparkHeight, window.innerWidth, window.innerHeight)
  //var sparkHeight = $('.video-stream').position().top;
  sparkShower(x, y, sparkWidth, sparkHeight);
}
function infoButtonClick2() {
  console.log("In Button 3 firework");
    let button = $(".paper")[0].getBoundingClientRect()
    var x = button.x + ( button.width / 2 )
    var y = button.y + ( button.height / 2)
    
  var sparkCanvas = $('#canvas');
  var sparkWidth = sparkCanvas.width();
  var sparkHeight = sparkCanvas.height();
  console.log("Button 2 - x: ", x, ", y: ", y, ", width: ", sparkWidth, ", height: ", sparkHeight)
//   console.log(sparkWidth, sparkHeight, window.innerWidth, window.innerHeight)
  //var sparkHeight = $('.video-stream').position().top;
  sparkShower(x, y, sparkWidth, sparkHeight);
  }
  function infoButtonClick3() {
    console.log("In Button 3 firework");
    let button = $(".scissors")[0].getBoundingClientRect()
    var x = button.x + ( button.width / 2 )
    var y = button.y + ( button.height / 2)
    
  var sparkCanvas = $('#canvas');
  var sparkWidth = sparkCanvas.width();
  var sparkHeight = sparkCanvas.height();
  console.log("Button 3 - x: ", x, ", y: ", y, ", width: ", sparkWidth, ", height: ", sparkHeight)
//   console.log(sparkWidth, sparkHeight, window.innerWidth, window.innerHeight)
  //var sparkHeight = $('.video-stream').position().top;
  sparkShower(x, y, sparkWidth, sparkHeight);
  }


//-------------------------------------------//

var gameModule = (function () {

    $(function() {

        // General variables
        var playerChoice,
            computerChoice,
            winner,
            round = 1,
            playerScore = 0,
            computerScore = 0,
            bestOf,
            overallResultClass,
            overallResultText,
            character,
            choices = ['rock', 'paper', "scissors"];
            // users = ['Harry', 'Ron', 'Hermione'];
            // villians = ['Voldemort', 'Bellatrix', 'Lucius Malfoy'];
            // index = 0;
           // Set what character is chosen and start the game
           let user = "";
         userChar = $('.choose-character li').on('click', function(e) {

          e.preventDefault();
          user = setCharacter($(this), '.player-character');
          nextScreen($(this));
          return console.log(user);
      });

      let villian =  "";
      // Set what character is chosen and start the game
      villianChar = $('.choose-rival li').on('click', function(e) {

          e.preventDefault();
          villian = setCharacter($(this), '.computer-character');
          $('body').addClass('game-started');
          return console.log(villian);
      });

      // let charName = "";
      // for (let i = 0; i < userChar.length; i++) {
      //   console.log("Each character ", userChar[i].innerText);
      //   charName = userChar[i].innerText;
      // }

      // let villName = "";
      // for (let i = 0; i < villianChar.length; i++) {
      //   console.log("Each character ", villianChar[i].innerText);
      //   villName = villianChar[i].innerText;
      // }

        var playerWinsText = `You win the round!`,
            computerWinsText = `Villian wins the round!`,
            tieText = "It's a Tie!",
            overallPlayerWinText = "<h2>Well Done!</h2> <p>You won against the computer!</p>",
            overallComputerWinText = "<h2>You Lose...</h2> <p>The computer has defeated you!</p>",
            overallTieText = "<h2>It's a draw!</h2> <p>Good effort young wizard!</p>";

        // Set Characters
        function setCharacter(div, className) {
            character = $(div).data('character');
            $(className).addClass(character);
        }

        function nextScreen(div) {
            div.parents('.starter-screen').hide().next().addClass('animate-in');
        }

        // Decides on whether the computer is playing rock, paper or scissors
        function computerDecision() {

            var randomChoice = Math.floor(Math.random() * choices.length);
            return choices[randomChoice];

        }

        // Plays the game
        function playGame(playerChoice) {

            computerChoice = computerDecision();
            round++;

            // Set Choices
            $('.player-choice-icon').attr('class', 'player-choice-icon ' + playerChoice);
            $('.computer-choice-icon').attr('class', 'computer-choice-icon ' + computerChoice);

            winner = decideWinner(playerChoice, computerChoice);

            // Set the values on the screen
            setValues(playerChoice, computerChoice, winner);

        }

        // Sets all the values on the board
        function setValues(playerChoice, computerChoice, winnerText) {

            $('.player-choice').text(playerChoice); // If the player has chosen rock, paper or scissors
            $('.computer-choice').text(computerChoice); // If the computer has chosen rock, paper or scissors
            $('.winner').text(winnerText); // Who won the round

            // If the game has been reset set the score immediately
            if(round !== 1) {

                // Set the values once the animation has finished
                setTimeout(function(){
                    setScore();
                }, 4000);

            } else {

                // Set the values immediately
                setScore();
                $('.round').text(round);

            }

        }

        // Set the scores
        function setScore() {

            $('.player-score').text(playerScore); // The running score for the player
            $('.computer-score').text(computerScore); // The running score for the computer

        }

        // function playerName(str) {
        //   switch (str) {
        //     case 1: str ==='Harry'
        //       return "Harry"
        //     case 2: str === 'Ron'
        //     return "Ron"
        //     case 3: str ==='Hermione'
        //       return "Hermoine"
        //   }
        // }


        // Decide who wins based on the player & computer choice
        function decideWinner(playerChoice, computerChoice) {

            var resultClass;

            // Who wins, What text is shown & What class is applied to the result screen
            if (playerChoice === computerChoice) {

                // If there is a tie
                winner = tieText;
                resultClass = "tie";

            } else if (playerChoice === "rock") {

                // If the player chooses "Rock"
                switch (computerChoice) {
                    case "scissors":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                    case "paper":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;
                }

            }  else if (playerChoice === "paper") {

                // If the player chooses "Paper"
                switch (computerChoice) {
                    case "rock":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                    case "scissors":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;

                }

            } else {

                // If the player chooses "Scissors"
                switch (computerChoice) {
                    case "rock":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;
                    case "paper":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                }

            }

            // Set the class of the result screen
            $('.result').attr('class', 'result ' + resultClass);

            return winner;

        }

        // Set all variables to their base values
        function resetGame () {

            playerChoice = "";
            computerChoice = "";
            winner = "";
            round = 1;
            playerScore = 0;
            computerScore = 0;

            setValues();

            $('body').removeClass('end-game weapon-chosen');
            $('.play-again').show();

        }

        // Decide on who is the winner of the whole game
        function overallWinner() {

            if (playerScore > computerScore) {

                // Player wins
                overallResultText = overallPlayerWinText;
                overallResultClass = "win";

            } else if (playerScore < computerScore) {

                // Computer wins
                overallResultText = overallComputerWinText;
                overallResultClass = "lose";

            } else {

                // Tie
                overallResultText = overallTieText;
                overallResultClass = "tie";

            }

            $('.end-result').html(overallResultText);
            $('.end-screen').attr('class', 'end-screen ' + overallResultClass);

        }

        // Show the end screen and final result
        function endGame() {

            $('body').addClass('end-game');
            $('.play-again').hide();

            overallWinner();

        }

        // Set the total number of rounds
        function setBestOf(selectedRounds) {
          
            var endScreenRounds;

            bestOf = selectedRounds.data('rounds');
            $('.best-of').text(bestOf);

            // Set the active class on the number of rounds on the end screen
            endScreenRounds = ".rounds-" + bestOf;
            $(endScreenRounds).addClass('active').siblings().removeClass('active');

        }

        // Start
        $('.start').on('click', function(e) {

            e.preventDefault();
            nextScreen($(this));

        });

        // Set what character is chosen and start the game
        $('.choose-rounds li').on('click', function(e) {

            e.preventDefault();
            setBestOf($(this));
            nextScreen($(this));

        });

        // Play the game
        $('.weapon li').on('click', function(e) {

            e.preventDefault();
            playerChoice = $(this).data('weapon');

            $('body').addClass('weapon-chosen');

            playGame(playerChoice);

            if (round > bestOf) {
              var x = document.getElementById("play-again-btn");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
              // Get the modal
	            var modal = document.getElementById("myModal");
              
              overallWinner();
              console.log(overallWinner());
              if(overallResultClass == 'win'){
                document.getElementById('modal-type').innerHTML += `<p>Good job! You won!</p><a href='../part3/part3.html'> Finish </a>`
              }
              else if(overallResultClass == 'lose'){
                document.getElementById('modal-type').innerHTML += `<p>Oh no! You lost!</p><a href='../part3/part3.html'> Finish </a>`
              }
              else{
                document.getElementById('modal-type').innerHTML += `<p>You tied with the computer!</p><a href='../part3/part3.html'> Finish </a>`
              }
              document.getElementById('modal-type').className = `modal-content ${overallResultClass}-result`
              setTimeout(function() { 
                  document.getElementById('myModal').className = 'modal open';
                },5500)
               // endGame();

            }

        });

        // Play the next round
        $('.play-again').on('click', function(e) {

            e.preventDefault();
            $('body').removeClass('weapon-chosen');
            $('.round').text(round); // How many rounds there have been

        });

        // Reset the game from the beginning
        $('.reset').on('click', function(e) {

            e.preventDefault();
            endGameRPS();
            //resetGame();

        });

        // Reset the game from the beginning
        $('.rounds-end-screen li').on('click', function(e) {

            e.preventDefault();
            setBestOf($(this));

        });

//         function endGameRPS() {
//             // var answer = confirm("You won!");
//             // if (answer) {
//                 window.open("../../../part3/index3.html", "_self");
//             // }
// //         }

    });

}());