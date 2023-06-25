const containerWidth = 650;
const containerHeight = 650;
const gridSize = 20 * 20;
const container = document.querySelector('.container');
let isMouseDown = false;
let blackRainBowToggle = false;
let eraserToggle = false;
let darkenColor = false;
let red;
let green;
let blue;
let darkeningRatio = 0;
let cellDarkeningVal = [];
container.style.width = `${containerWidth + 2}px`;
container.style.height = `${containerHeight + 2}px`;
for(let i = 0 ; i < gridSize ; i++){
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.setAttribute('num', `${i + 1}`);
    cell.style.width = `${containerWidth / Math.sqrt(gridSize)}px`;
    cell.style.height = `${containerHeight / Math.sqrt(gridSize)}px`;
    container.appendChild(cell);
}


const grid = document.querySelectorAll('.grid-cell');


function changeCellColor (mouseEvent) {
    if(mouseEvent.buttons === 1){
        if (blackRainBowToggle) {
            // if(this.style.backgroundColor !== 'transparent' && this.style.backgroundColor !== 'black') return;
            if(darkenColor && this.style.backgroundColor !== 'transparent'){
                const cellColor = this.style.backgroundColor.substring(4, this.style.backgroundColor.length-1).replace(/ /g, '').split(',');
                red = cellColor[0];
                green = cellColor[1];
                blue = cellColor[2];
                function getMaxDarkening(a, b){
                    return a > b ? a : b;
                }
                const maxColor = getMaxDarkening((red / 10), getMaxDarkening((green / 10), (blue / 10)));
                const cellNumber = this.getAttribute('num');
                if(cellDarkeningVal[cellNumber] === undefined) cellDarkeningVal[cellNumber] = Math.ceil(maxColor);
                red = (red - (cellDarkeningVal[cellNumber]));
                green = (green - (cellDarkeningVal[cellNumber]));
                blue = (blue - (cellDarkeningVal[cellNumber]));
            }
            else{
                red = Math.floor(Math.random() * 257);
                green = Math.floor(Math.random() * 257);
                blue = Math.floor(Math.random() * 257);
            }
            this.style.backgroundColor = `rgba(${red},${green},${blue},1)`
        } else{
            this.style.backgroundColor = 'rgba(0,0,0,1)';
        }
    }
}

grid.forEach((cell) => cell.addEventListener('mousedown', changeCellColor));
grid.forEach((cell) => cell.addEventListener('mouseenter', changeCellColor));
grid.forEach((cell) => cell.addEventListener('dragstart', function (e) {e.preventDefault()}))
grid.forEach((cell) => cell.addEventListener('click', changeCellColor));

const clearButton = document.querySelector('.clear');

function clearGridCells(){
    grid.forEach(function (cell) {cell.style.backgroundColor = 'transparent'});
}

clearButton.addEventListener('click', clearGridCells);

const blackRainbowButton = document.querySelector('.black-rainbow');
blackRainbowButton.textContent = "colorful (toggle)";

function toggleBlackRainbow(){
    blackRainBowToggle = !blackRainBowToggle;
    if(blackRainBowToggle){
        blackRainbowButton.style.border = "3px solid darkslategray";
        blackRainbowButton.textContent = "black (toggle)";
        progressiveDarkeningButton.classList.add('btn-hover');
        progressiveDarkeningButton.classList.add('btn-active');
        progressiveDarkeningButton.style.cssText = "cursor: pointer opacity: 1";
        progressiveDarkeningButton.style.cursor = "pointer";
    }
    else{
        blackRainbowButton.style.border = "none";
        blackRainbowButton.textContent = "colorful (toggle)";
        progressiveDarkeningButton.style.opacity = 0.6;
        progressiveDarkeningButton.style.cursor = "not-allowed";
        progressiveDarkeningButton.style.border = "none";
        progressiveDarkeningButton.classList.remove('btn-hover');
        progressiveDarkeningButton.classList.remove('btn-active');
        darkenColor = false;
    }
}


blackRainbowButton.addEventListener('click', toggleBlackRainbow);

const progressiveDarkeningButton = document.querySelector('.progressive-darkening');
progressiveDarkeningButton.style.opacity = 0.6;
progressiveDarkeningButton.style.cursor = "not-allowed";

progressiveDarkeningButton.addEventListener('click', function () {
    if(!blackRainBowToggle) return;
    darkenColor = !darkenColor;
    if(darkenColor){
        progressiveDarkeningButton.style.border = "3px solid darkslategray";
    }
    else{
        progressiveDarkeningButton.style.border = "none";
    }
});


const eraserButton = document.querySelector('.eraser');

function toggleErase(){

}

eraserButton.addEventListener('click', toggleErase);



