/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

function ticTacToe(){
    let board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };

    // TODO: update the gameboard with the user input
    function markBoard(position, mark) {
        board[position] = mark
    }

    // TODO: print the game board as described at the top of this code skeleton
    function printBoard() {
        let updatedBoard = {
            1: '1', 2: '2', 3: '3',
            4: '4', 5: '5', 6: '6',
            7: '7', 8: '8', 9: '9'
        };

        for(let box in board){
            if(board[box] === 'X'){
                updatedBoard[box] = 'X'
            }
            else if(board[box] === 'O'){
                updatedBoard[box] = 'O'
            }
        }

        console.log('TIC TAC TOE GAME!\n\n' +
            ` ${updatedBoard[1]} | ${updatedBoard[2]} | ${updatedBoard[3]} \n` +
            ' --------- \n' +
            ` ${updatedBoard[4]} | ${updatedBoard[5]} | ${updatedBoard[6]} \n` +
            ' --------- \n' +
            ` ${updatedBoard[7]} | ${updatedBoard[8]} | ${updatedBoard[9]} \n`);
    }


    // TODO: check for wrong input, this function should return true or false.
    // true denoting that the user input is correct
    // you will need to check for wrong input (user is entering invalid position) or position is out of bound
    // another case is that the position is already occupied
    function validateMove(position) {
        if(Number(position) === NaN && (position < 1 || position > 9)){
            return false
        }
        else if(board[position] != " "){
            return false
        }
        else{
            return true
        }
    }

    // TODO: list out all the combinations of winning, you will neeed this
    // one of the winning combinations is already done for you
    let winCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    // TODO: implement a logic to check if the previous winner just win
    // This method should return with true or false
    function checkWin(player) {
        for(let comb of winCombinations){
            if(board[comb[0]] === player && board[comb[1]] === player && board[comb[2]] === player){
                return true
            }
        }
        return false
    }

    // TODO: implement a function to check if the game board is already full
    // For tic-tac-toe, tie bascially means the whole board is already occupied
    // This function should return with boolean
    function checkFull() {
        for(let box in board){
            if(board[box] === " "){
                return false
            }
        }
        return true
    }

    // *****************************************************
    // Copy all your code/fucntions in Part 1 to above lines
    // (Without Test Cases)
    // *****************************************************


    // TODO: the main part of the program
    // This part should handle prompting the users to put in their next step, checking for winning or tie, etc
    function playTurn(player) {
        console.log(`It's Player ${player}'s turn! `)
        let position = prompt("Which position do you want to take? ")

        //When user enters an invalid input
        while(!validateMove(position)){
            position = prompt("Error! Please enter a valid position! ")
        }

        markBoard(position, player)
        console.clear()
        printBoard()
    }

    // entry point of the whole program
    console.log('Game started:\nTIC TAC TOE GAME!\n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified){
        playTurn(currentTurnPlayer);

        //Check whether a player wins or if its a tie
        if(checkWin(currentTurnPlayer)){
            console.log(`Congratulations Player ${currentTurnPlayer}!\nYou have won the game!`)
            winnerIdentified = true
        }
        else if(checkFull()){
            console.log("Game Over! It's a TIE!")
            winnerIdentified = true
        }

        //Switch players
        if(currentTurnPlayer === 'X'){
            currentTurnPlayer = 'O'
        }
        else if(currentTurnPlayer === 'O'){
            currentTurnPlayer = 'X'
        }
        // feel free to add logic here if needed, e.g. announcing winner or tie
    }
}

//Ask the user if they want to restart the game
function restartGame(){
    let tryAgain = prompt("Do you want to play again? (Y/N) ")
    while(tryAgain != null){
        if(tryAgain === "Y" || tryAgain === "y"){         //When they want to play again
            tryAgain = null
            console.clear()
            console.log("Great! Let's start over!")
            ticTacToe()
        }else if(tryAgain === "N" || tryAgain === "n"){   //When they want to quit
            return 0
        }else{
            tryAgain = prompt("Please enter either Y/N. ")  //When user gives invalid input
        }
    }
    restartGame()
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
ticTacToe()
restartGame()