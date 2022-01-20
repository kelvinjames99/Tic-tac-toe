const gameBoard = (() =>{
    let gameArray = [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', '']
    ];
    const resetArray = () => {
        for(i = 0; i < gameArray.length; i++){
            for(j = 0; j < gameArray.length; j++){
                gameArray[i][j] = "";
            }
        }
    }
    return {gameArray, resetArray}; 
})();

const player = (mark, name) => {
    const getName = () => name; 
    const addMark = (i, j) => {
        gameBoard.gameArray[i][j] = mark
        displayController.draw();
    };
    return {addMark, getName};
};

const displayController = (() => {
    const player1 = player('X', "Player1");
    const player2 = player('O', "Player2");
    let turn = 0;
    let currentPlayer = player1;

    const draw = () => {
        for(i = 0; i < gameBoard.gameArray.length; i++){
            line = gameBoard.gameArray[i];
            for(j = 0; j < line.length; j++){
                document.getElementById(i.toString() + "," + j.toString()).innerHTML = gameBoard.gameArray[i][j];
            }
        }
    };
    
    const openGameoverScreen = () => {
        let winnerElement = document.getElementById("winner-name")
        if(turn == 9){
            winnerElement.innerHTML = "Tie !!!"
            winnerElement.style.color = "yellow";
        }
        else{
            winnerElement.innerHTML = currentPlayer.getName() + "Wins !!!";
            if(currentPlayer.getName() == "Player1"){
                winnerElement.style.color = "blue";
            }
            else{
                winnerElement.style.color = "red";
            }   
        }
        document.getElementById("winner-screen").style.width = "100%";
    }

    const checkGame = () => {
        let gameboard = gameBoard.gameArray;
        if(turn == 9){
            openGameoverScreen();
            return;
        }
        else{
            //check diagonals
            if(gameboard[0][0] == gameboard[1][1] && gameboard[0][0] == gameboard[2][2] && gameboard[0][0] != ''){
                openGameoverScreen();
            }
            else if(gameboard[0][2] == gameboard[1][1] && gameboard[0][2] == gameboard[2][0] && gameboard[0][2] != ''){
                openGameoverScreen();
            }
            else{
                //check horizontal and vertical lines
                for(i = 0; i < gameboard.length; i++){
                    let line = gameboard[i]
                    let column = gameboard.map((arr) => arr[i]);
                    if(line[0] == line[1] && line[0] == line[2] && line[0] != ''){
                        openGameoverScreen();
                    }
                    else if(column[0] == column[1] && column[0] == column[2] && column[0] != ''){
                        openGameoverScreen();
                    }
                }
            }
            return;
        }
    }

    const playerMarking = (i, j) => {
        if(gameBoard.gameArray[i][j] == ''){
            currentPlayer.addMark(i, j);
            turn++;
            checkGame();
            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }
    }

    const newGame = () => {
        document.getElementById("winner-screen").style.width = "0";
        gameBoard.resetArray();
        currentPlayer = player1;
        turn = 0;
        draw();
    }

    return {draw, playerMarking, newGame};
})();


window.onload = function(){
    displayController.draw();
};