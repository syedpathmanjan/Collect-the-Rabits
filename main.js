const selectionDiv = document.querySelector(".selection");
const board = document.querySelector(".board");


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

setInterval(() => {
    rabbits.forEach(rabbit => moveRabbit(rabbit));
}, 1000);

