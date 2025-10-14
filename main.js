const selectionDiv = document.querySelector(".selection");
const board = document.querySelector(".board");
const scoreElement = document.getElementById("score")


let mouseClicked = false;

let movingMemo = false;

let resizingMemo = false;

let offsetXStart = 0;
let offsetYStart = 0;
let offsetXEnd = 0;
let offsetYEnd = 0;

let offsetYCurrent = 0;
let offsetXCurrent = 0;

board.addEventListener("mousedown", (e) => {

	mouseClicked = true;

	offsetXStart = e.offsetX;
	offsetYStart = e.offsetY;


	selectionDiv.style.display = "block";
});

board.addEventListener("mouseup", (e) => {
	mouseClicked = false;
	offsetXEnd = e.offsetX;
	offsetYEnd = e.offsetY;

	let width = offsetXEnd - offsetXStart;
	let height = offsetYEnd - offsetYStart;

    const selectionRect = selectionDiv.getBoundingClientRect();

    rabbits.forEach((rabbit, index) => {
        const rabbitRect = rabbit.getBoundingClientRect();

        const isIntersecting = !(
            selectionRect.right < rabbitRect.left ||
            selectionRect.left > rabbitRect.right ||
            selectionRect.bottom < rabbitRect.top ||
            selectionRect.top > rabbitRect.bottom
        );

        if (isIntersecting) {
            rabbit.remove();
            rabbits[index] = null;
            score++;
            console.log("Score:", score);
            scoreElement.textContent = "Score: " + score;
        }
    });

    for (let i = rabbits.length - 1; i >= 0; i--) {
        if (rabbits[i] === null) rabbits.splice(i, 1);
    }

    if(score == 100){
        timeElement.textContent = "Game Over";
        clearInterval(timer); 
    }

	selectionDiv.style.width = '0px';
	selectionDiv.style.height = '0px';
	selectionDiv.style.display = 'none';
	board.style.cursor = 'default';

});

board.addEventListener("mousemove", (e) => {
	if (mouseClicked && !movingMemo && !resizingMemo) {
        if (e.offsetX - offsetXStart > 0 && e.offsetY - offsetYStart < 0){
            offsetXCurrent = e.offsetX  - offsetXStart;
			offsetYCurrent = offsetYStart -  e.offsetY;
			selectionDiv.style.top = `${e.y}px`;
			selectionDiv.style.bottom = `${offsetYStart}px`;
			selectionDiv.style.right = `${e.x}px`;
			selectionDiv.style.left = `${offsetXStart}px`;
        }
		else if (e.offsetX - offsetXStart < 0 && e.offsetY - offsetYStart > 0) {
			offsetXCurrent = offsetXStart - e.offsetX;
			offsetYCurrent = e.offsetY - offsetYStart;
			selectionDiv.style.top = `${offsetYStart}px`;
			selectionDiv.style.bottom = `${e.y}px`;
			selectionDiv.style.right = `${offsetXStart}px`;
			selectionDiv.style.left = `${e.x}px`;
		} else if (e.offsetX - offsetXStart < 0) {
			offsetXCurrent = offsetXStart - e.offsetX;
			offsetYCurrent = offsetYStart - e.offsetY;
			selectionDiv.style.top = `${e.y}px`;
			selectionDiv.style.left = `${e.x}px`;
			selectionDiv.style.bottom = `${offsetYStart}px`;
			selectionDiv.style.right = `${offsetXStart}px`;
		} else {
			offsetXCurrent = e.offsetX - offsetXStart;
			offsetYCurrent = e.offsetY - offsetYStart;
			selectionDiv.style.top = `${offsetYStart}px`;
			selectionDiv.style.left = `${offsetXStart}px`;
		}
		selectionDiv.style.width = `${offsetXCurrent}px`;
		selectionDiv.style.height = `${offsetYCurrent}px`;
	}
});

const container = document.getElementById('container');
const rabbitCount = 100;
const rabbits = [];

function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    return { x, y };
}

function createRabbit(index) {
    const rabbit = document.createElement('div');
    rabbit.className = 'rabbit';
    rabbit.textContent = '🐇';
    container.appendChild(rabbit);
    rabbits.push(rabbit);

    const { x, y } = getRandomPosition();
    rabbit.style.transform = `translate(${x}px, ${y}px)`;
}

function moveRabbit(rabbit) {
    const { x, y } = getRandomPosition();
    rabbit.style.transform = `translate(${x}px, ${y}px)`;
}

for (let i = 0; i < rabbitCount; i++) {
    createRabbit(i);
}

let rabbitInterval = setInterval(() => {
    if(timeLeft == 0){
        console.log("bl")
    }
    rabbits.forEach(rabbit => moveRabbit(rabbit));
}, 1000);

let timeLeft = 5;
let timer;
let score = 0;



const timeElement = document.getElementById("time")

function startCountdown() {
    clearInterval(timer); 
    timeLeft = 5;
    timer = setInterval(() => {
        timeLeft--;
        console.log("Time left:", timeLeft);
        timeElement.textContent = "Time Left: " + timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("Game Over");
            clearInterval(rabbitInterval)
            timeElement.textContent = "Game Over";
            rabbits.forEach((rab) => rab.remove())
        }
    }, 1000);
}

const wand = document.getElementById('wand');

document.addEventListener('mousemove', (e) => {
    wand.style.left = e.clientX + 'px';
    wand.style.top = e.clientY + 'px';

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

startCountdown();
