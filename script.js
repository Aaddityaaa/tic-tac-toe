let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msgParagraph = document.querySelector("#msg");
let turn0 = true; //playerX, playerO

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const changeColor = (box,val) => {
    if(val){
        box.style.color = "#4361ee"; //if player O's turn
    }
    else{
        box.style.color = "#ff595e"; //if player X's turn
    }
}
const resetGame = () => {
    turn0 = true; //reset the turn
    enableBoxes(); //enable all boxes
    clicks = 0; //reset the click count
    msgContainer.classList.add("hide"); //hide the message container
}
const drawGame = () => {
    if(clicks === 9 && !win){
        msgParagraph.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        // disableBoxes(); //disable all boxes
    }
}

let clicks = 0; //to count the number of clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clicks++;
        if (turn0) {
            box.innerText = "O"
            changeColor(box,turn0);
            turn0 = false;
        }
        else {
            box.innerText = "X";
            changeColor(box,turn0);
            turn0 = true;
        }
        box.disabled = true; //disable the box after click
        checkWinner();
        drawGame();
    })
    box.classList.add("box-grow");

})
const enableBoxes = () => {
    for(let  box of boxes){
        box.disabled = false; //enable all boxes
        box.innerText = ""
    }
}
const disableBoxes = () => {
    for(let  box of boxes){
        box.disabled = true; //disable all boxes
        
    }
}
const showWinner = (winner) => {
    msgParagraph.innerText = `Congratulations! winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

let win = false;
const checkWinner = () => {
    for (let pattern of winningCombos) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if (pos1val != "" || pos2val != "" || pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                win = true;
                showWinner(pos1val);
            }
        }
    }
    
}

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);

