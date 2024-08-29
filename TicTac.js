document.addEventListener("DOMContentLoaded", function () {
    window.onload = function () {
        let boxes = document.querySelectorAll(".box");
        let reset = document.querySelector("#reset");
        let newGameBtn = document.querySelector("#new-btn");
        let msgContainer = document.querySelector(".msg-container");
        let msg = document.querySelector("#msg");
        let scoreX = 0;
        let scoreO = 0;
        let turnO = true;
        let moves = 0;

        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];

        const resetGame = () => {
            turnO = true;
            moves = 0;
            enableBoxes();
            msgContainer.classList.add("hide");
            updateTurnIndicator();
        };

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (turnO) {
                    box.innerText = "O";
                } else {
                    box.innerText = "X";
                }
                box.disabled = true;
                turnO = !turnO;
                moves++;
                checkWinner();
                updateTurnIndicator();
            });
        });

        const disableBoxes = () => {
            boxes.forEach(box => box.disabled = true);
        };

        const enableBoxes = () => {
            boxes.forEach(box => {
                box.disabled = false;
                box.innerText = "";
                box.style.backgroundColor = ""; // Reset background color
            });
        };

        const showWinner = (winner, pattern) => {
            msg.innerText = `Congratulations, Winner Is ${winner}`;
            pattern.forEach(index => {
                boxes[index].style.backgroundColor = "#8fbc8f"; // Highlight winning boxes
            });
            msgContainer.classList.remove("hide");
            disableBoxes();
            if (winner === "X") scoreX++;
            else scoreO++;
            updateScores();
        };

        const checkWinner = () => {
            for (let pattern of winPatterns) {
                let [a, b, c] = pattern;
                let pos1Val = boxes[a].innerText;
                let pos2Val = boxes[b].innerText;
                let pos3Val = boxes[c].innerText;
                if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val, pattern);
                    return;
                }
            }
            if (moves === 9) {
                msg.innerText = "It's a Draw!";
                msgContainer.classList.remove("hide");
            }
        };

        const updateScores = () => {
            document.querySelector("#scoreX").innerText = scoreX;
            document.querySelector("#scoreO").innerText = scoreO;
        };

        const updateTurnIndicator = () => {
            document.querySelector("#turn-indicator").innerText = turnO ? "O's Turn" : "X's Turn";
        };

        newGameBtn.addEventListener("click", resetGame);
        reset.addEventListener("click", resetGame);
        updateScores();
        updateTurnIndicator();
    };
});
