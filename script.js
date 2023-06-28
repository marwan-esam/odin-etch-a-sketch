class Grid {
    constructor(containerWidth, containerHeight, gridSize) {
      this.containerWidth = containerWidth;
      this.containerHeight = containerHeight;
      this.gridSize = gridSize;
      this.container = document.querySelector('.container');
      this.isMouseDown = false;
      this.blackRainBowToggle = false;
      this.eraserToggle = false;
      this.gridLineToggle = false;
      this.darkenColor = false;
      this.red;
      this.green;
      this.blue;
      this.darkeningRatio = 0;
      this.cellDarkeningVal = [];
      this.container.style.width = `${this.containerWidth}px`;
      this.container.style.height = `${this.containerHeight}px`;
  
      // for (let i = 0; i < this.gridSize; i++) {
      //   const cell = document.createElement('div');
      //   cell.classList.add('grid-cell');
      //   cell.setAttribute('num', `${i + 1}`);
      //   cell.style.width = `${this.containerWidth / Math.sqrt(this.gridSize)}px`;
      //   cell.style.height = `${this.containerHeight / Math.sqrt(this.gridSize)}px`;
      //   this.container.appendChild(cell);
      // }

      const columns = Math.sqrt(this.gridSize);
      const cells = Math.sqrt(this.gridSize);
      let cellNum = 0;
      for(let i = 0 ; i < columns ; i++){
        const column = document.createElement('div');
        column.classList.add('column');
        for(let j = 0 ; j < cells ; j++){
          const cell = document.createElement('div');
          cell.classList.add('grid-cell');
          cell.setAttribute('num', `${cellNum++}`);
          cell.style.height = `${this.containerHeight / cells}px`
          column.appendChild(cell);
        }
        this.container.appendChild(column);
      }
      this.grid = document.querySelectorAll('.grid-cell');
  
      this.grid.forEach((cell) => cell.addEventListener('mousedown', this.changeCellColor.bind(this)));
      this.grid.forEach((cell) => cell.addEventListener('mouseenter', this.changeCellColor.bind(this)));
      this.grid.forEach((cell) => cell.addEventListener('dragstart', function (e) { e.preventDefault() }));
      this.grid.forEach((cell) => cell.addEventListener('click', this.changeCellColor.bind(this)));
  
      const clearButton = document.querySelector('.clear');
      clearButton.addEventListener('click', this.clearGridCells.bind(this));
  
      this.blackRainbowButton = document.querySelector('.black-rainbow');
      this.blackRainbowButton.textContent = "colorful (toggle)";
      this.blackRainbowButton.style.border = "none";
      this.blackRainbowButton.addEventListener('click', this.toggleBlackRainbow.bind(this));
  
      this.progressiveDarkeningButton = document.querySelector('.progressive-darkening');
      this.progressiveDarkeningButton.style.opacity = 0.6;
      this.progressiveDarkeningButton.style.cursor = "not-allowed";
      this.progressiveDarkeningButton.addEventListener('click', this.toggleDarkenColor.bind(this));
      this.progressiveDarkeningButton.style.border = "none";
      this.progressiveDarkeningButton.classList.remove('btn-hover');
      this.progressiveDarkeningButton.classList.remove('btn-active');

      this.eraserButton = document.querySelector('.eraser');
      this.eraserButton.style.border = "none";
      this.eraserButton.addEventListener('click', this.toggleErase.bind(this));

      this.gridLineButton = document.querySelector('.grid-line');
      this.gridLineButton.textContent = 'hide Line (toggle)';
      this.gridLineButton.addEventListener('click', this.toggleGridLine.bind(this));
    }
  
    changeCellColor(mouseEvent) {
      if (mouseEvent.buttons === 1) {
        const cell = mouseEvent.target;
        if(this.eraserToggle){
            cell.style.backgroundColor = '';
        }
        else if (this.blackRainBowToggle) {
          if (this.darkenColor) {
            if(cell.style.backgroundColor === ''){
                this.red = Math.floor(Math.random() * 257);
                this.green = Math.floor(Math.random() * 257);
                this.blue = Math.floor(Math.random() * 257);
                cell.style.backgroundColor = `rgba(${this.red},${this.green},${this.blue},1)`;
            }
            const cellColor = cell.style.backgroundColor.substring(4, cell.style.backgroundColor.length - 1).replace(/ /g, '').split(',');
            this.red = cellColor[0];
            this.green = cellColor[1];
            this.blue = cellColor[2];
  
            function getMaxDarkening(a, b) {
              return a > b ? a : b;
            }
  
            const maxColor = getMaxDarkening((this.red / 10), getMaxDarkening((this.green / 10), (this.blue / 10)));
            const cellNumber = cell.getAttribute('num');
            if (this.cellDarkeningVal[cellNumber] === undefined) this.cellDarkeningVal[cellNumber] = Math.ceil(maxColor);
            this.red = (this.red - (this.cellDarkeningVal[cellNumber]));
            this.green = (this.green - (this.cellDarkeningVal[cellNumber]));
            this.blue = (this.blue - (this.cellDarkeningVal[cellNumber]));
          } else{
            this.red = Math.floor(Math.random() * 257);
            this.green = Math.floor(Math.random() * 257);
            this.blue = Math.floor(Math.random() * 257);
          }
          cell.style.backgroundColor = `rgba(${this.red},${this.green},${this.blue},1)`
        } else {
          cell.style.backgroundColor = 'rgba(0,0,0,1)';
        }
      }
    }
  
    clearGridCells() {
      this.grid.forEach(function (cell) { cell.style.backgroundColor = ''});
    }
  
    toggleBlackRainbow() {
      this.blackRainBowToggle = !this.blackRainBowToggle;
      if(this.eraserToggle){
        this.eraserToggle = false;
        this.eraserButton.style.border = "none";
      }
      if (this.blackRainBowToggle) {
        this.blackRainbowButton.style.border = "3px solid darkslategray";
        this.blackRainbowButton.textContent = "black (toggle)";
        this.progressiveDarkeningButton.classList.add('btn-hover');
        this.progressiveDarkeningButton.classList.add('btn-active');
        this.progressiveDarkeningButton.style.opacity = 1;
        this.progressiveDarkeningButton.style.cursor = "pointer";
      } else {
        this.blackRainbowButton.style.border = "none";
        this.blackRainbowButton.textContent = "colorful (toggle)";
        this.progressiveDarkeningButton.style.opacity = 0.6;
        this.progressiveDarkeningButton.style.cursor = "not-allowed";
        this.progressiveDarkeningButton.style.border = "none";
        this.progressiveDarkeningButton.classList.remove('btn-hover');
        this.progressiveDarkeningButton.classList.remove('btn-active');
        this.darkenColor = false;
      }
    }
  
    toggleDarkenColor() {
      if (!this.blackRainBowToggle) return;
      this.darkenColor = !this.darkenColor;
      if (this.darkenColor) {
        console.log(this.blackRainBowToggle);
        this.progressiveDarkeningButton.style.border = "3px solid darkslategray";
      } else {
        this.progressiveDarkeningButton.style.border = "none";
      }
    }
  
    toggleErase() {
      this.eraserToggle = !this.eraserToggle;
      if(this.eraserToggle){
        this.eraserButton.style.border = "3px solid darkslategray";
        this.blackRainbowButton.style.border = "none";
        this.darkenColor = false;
        this.progressiveDarkeningButton.style.opacity = 0.6;
        this.progressiveDarkeningButton.style.cursor = "not-allowed";
        this.progressiveDarkeningButton.style.border = "none";
      }
      else{
        this.eraserButton.style.border = "none";
        this.blackRainbowButton.style.border = "3px solid darkslategray";
        this.progressiveDarkeningButton.style.opacity = 1;
        this.progressiveDarkeningButton.style.cursor = "pointer";
      }
    }

    toggleGridLine () {
        this.gridLineToggle = !this.gridLineToggle;
        const cells = this.container.querySelectorAll('.grid-cell');
        if(this.gridLineToggle){
            cells.forEach((cell) => cell.style.border = "none");
            this.gridLineButton.textContent = "show line (toggle)";
        }
        else{
            cells.forEach((cell) => cell.style.border = "0.1px solid rgba(1, 1, 1, 0.50)");
            this.gridLineButton.textContent = "hide line (toggle)";
        }

    }
  }
  
const gridSizeInput = document.querySelector('.grid-size-range');
const gridSizeVal = document.querySelector('.grid-size-val');
gridSizeInput.value = 16;
gridSizeVal.textContent = `${gridSizeInput.value}x${gridSizeInput.value}`;
let grid = new Grid(652, 652, 16 * 16);;
function showNewGrid (event) {
    const inputValue = event.target.value;
    while(this.container.hasChildNodes()){
        this.container.removeChild(this.container.firstChild);
    }
    grid = new Grid(652, 652, inputValue * inputValue);
}

function changeGridSizeLabel (event) {
  const inputValue = event.target.value;
  gridSizeVal.textContent = `${inputValue}x${inputValue}`;
}

gridSizeInput.addEventListener('change', showNewGrid.bind(grid));
gridSizeInput.addEventListener('input', changeGridSizeLabel);

  