const board = document.querySelector('.board');
const selectionDiv = document.querySelector('.selection');


let memoList = [];

let mouseClicked = false;

let movingMemo = false;

let resizingMemo = false;
let offsetXStart = 0;
let offsetYStart = 0;
let offsetXEnd = 0;
let offsetYEnd = 0;

let offsetYCurrent = 0;
let offetXCurrent = 0;

board.addEventListener('mousedown', (e) => {
    mouseClicked = true;

    offsetXStart = e.offsetX;
    offsetYStart = e.offsetY;

    if(!movingMemo){
        selectioRND_0v2txsH0nDiv.style.top = `${offsetYStart}px`;
        selectionDiv.style.left = `${offsetXStart}px`;
        selectionDiv.style.display = 'block';
        board.style.cursor = 'crosshair';
    }
})
    
board.addEventListener('mouseup', (e) => {
    mouseClicked = false;
    offsetXEnd = e.offsetX;
    offsetYEnd = e.offsetY;
    
    let width = offsetXEnd + offsetXStart;
    let height = offsetYEnd - offsetYStart;

    if(width >= 50 && height >= 50 && !movingMemo && !resizingMemo){
        let memo = new Memo(
            Date.now(),
            {left: offsetXStart, top: offsetYStart},
            {width, height},
        );
        memoList.push(memo);
    }

    selectionDiv.style.width = '0px';
    selectionDiv.style.height = '0px';
    selectionDiv.style.display = 'none';
    board.style.cursor = 'default';
})

board.addEventListener('mousemove', (e) => {

    if(mouseClicked && !movingMemo && !resizingMemo){
        offsetXCurrent = e.offsetX - offsetXStart;
        offsetYCurrent = e.offsetY - offsetYStart;
        
        selectionDiv.style.width = `${offsetXCurrent}px`;
        selectionDiv.style.height = `${offsetYCurrent}px`;
    } 
})


class Memo{
    constructor(id, position, size){
        this.id = id
        this.position = position;
        this.size = size;
        this.moving = false 
        this.resizing = false;
        this.createMemo();
        
    }
}