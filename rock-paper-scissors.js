    let score =  JSON.parse(localStorage.getItem('score')) || { // ".getItem" is used to fetch the string value stored in localStorage, which in this case is the game scores converted into strings using "JSON.stringify();". "JSON.parse();" converts 'score' from a string back into an object.
        wins: 0,                                            
        losses: 0,                                          // ' || ' is a "Default Operator". If the code on the left side of the operator is true, it wll run that and block the code on the right side of it. If the left side code is false, then it runs the right side code by default.
        ties: 0                                             // the code to the left of ' || ' in this case indicates if a score is stored. If it is true (score is present), it will continue to update scores. If no score is present (code is false), then the right side code will be run (scores are reset to 0).
    }; 


    scoreElementUpdate();

    let isAutoPlaying = false;
    let intervalID; // an interval ID is created everytime an iteration of a 'setInterval();' function loop is run and completed.

    function autoPlay() {
        if(!isAutoPlaying) {
            intervalID = setInterval(() => { // the interval ID created after each iteration of 'setInterval();' is stored in a variable named 'intervalID'.
                const playerMove = pickComputerMove();
                playGame(playerMove);
            }, 2000);
            isAutoPlaying = true; // the function will continue to run as long as the "Auto Play" button is clicked.

            document.querySelector('.js-auto-play-button').innerHTML = 'Stop';
        } 
        else {
            clearInterval(intervalID); // 'clearInterval();' is a function used to stop running a 'setInterval();' loop by clearing the assigned interval ID.
            isAutoPlaying = false;

            document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
        }
    }

    document.querySelector('.js-rock-button')
        .addEventListener('click', () => { // 'addEventListener();' is a function that is similar to the 'onclick' attribute, but has better features and is more efficient. It holds 2 parameters: the 'event' ie. "click", and the function to run during the event.
            playGame('Rock');
        });

    document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
            playGame('Paper');
        });

    document.querySelector('.js-scissors-button')
        .addEventListener('click', () => {
            playGame('Scissors');
        });

    document.querySelector('.js-reset-button')
        .addEventListener('click', () => {
            showResetConfirmation();
        });

    document.querySelector('.js-auto-play-button')
        .addEventListener('click', () => {
            autoPlay();
        });

    document.body.addEventListener('keydown', (event) => { // when "keydown" is used, 'addEventListener' saves the event object in the parameter "event", which contains the key on the keyboard which was pressed. 
        // console.log(event.key); // displays which key was pressed.
        if(event.key === 'r') {
            playGame('Rock');
        } else if(event.key === 'p') {
            playGame('Paper');
        } else if(event.key === 's') {
            playGame('Scissors');
        } else if(event.key === 'a') {
            autoPlay();
        } else if(event.key === 'Backspace') {
            showResetConfirmation();
        }
    });

    document.querySelector('.js-reset-button')
        .addEventListener('click', () => {
            showResetConfirmation(); // clicking the 'reset' button displays a confirmation message rather thanresetting scores immediately.
        });

    function showResetConfirmation() {
        document.querySelector('.js-reset-confirmation')
            .innerHTML = `
                Are you sure you want to reset the score?
                <button class="js-reset-yes reset-button">
                Yes
                </button>
                <button class="js-reset-no reset-button">
                No
                </button>`;

        document.querySelector('.js-reset-yes')
            .addEventListener('click', () => {
                resetScore();
                hideResetConfirmation();
            });

        document.querySelector('.js-reset-no')
            .addEventListener('click', () => {
                hideResetConfirmation();
            });
    }

    function hideResetConfirmation() {
        document.querySelector('.js-reset-confirmation')
            .innerHTML = '';
    }

    function playGame(playerMove) { // 'playerMove' is set as a parameter for the 'playGame' function.

        const computerMove = pickComputerMove(); // 'pickComputerMove' function is run and its value is stored in the 'computerMove' variable, and the rest of the 'playGame' function code is run.

        let result = '';

        if (playerMove === 'Rock') {
            if (computerMove === 'Rock') {
                result = 'Tie.';
            } else if (computerMove === 'Paper') {
                result = 'You lose.';
            } else if (computerMove === 'Scissors') {
                result = 'You win!';
            }
        }

        else if (playerMove === 'Paper') {
            if (computerMove === 'Rock') {
                result = 'You win!';
            } else if (computerMove === 'Paper') {
                result = 'Tie.';
            } else if (computerMove === 'Scissors') {
                result = 'You lose.';
            }
        }                

        else if (playerMove === 'Scissors') {
            if (computerMove === 'Rock') {
                result = 'You lose.';
            } else if (computerMove === 'Paper') {
                result = 'You win!';
            } else if (computerMove === 'Scissors') {
                result = 'Tie.';
            }
        }

        if (result === 'You win!') {
            score.wins ++;
        } 

        else if (result === 'You lose.') {
            score.losses ++;
        }

        else if (result === 'Tie.') {
            score.ties ++;
        } 

        localStorage.setItem('score', JSON.stringify(score)); // "localStorage.setItem()" stores string values into the computer storage so that if webpage is refreshed, stored values are not reset.

        scoreElementUpdate();

        document.querySelector('.js-result')
            .innerHTML = result;

        document.querySelector('.js-moves')
            .innerHTML = `You: ${playerMove}, Computer: ${computerMove}`;                    
    }

    function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        alert('Scores have been reset!');
        localStorage.removeItem('score');
        scoreElementUpdate();
    }

    function scoreElementUpdate() {
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }


    function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1/3) {
            computerMove = 'Rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
            computerMove = 'Paper';
        } else if (randomNumber < 1) {
            computerMove = 'Scissors';
        }
        return computerMove; // returns the value of 'computerMove' after the if-statement code is run, back into the function 'pickComputerMove'. 
    }