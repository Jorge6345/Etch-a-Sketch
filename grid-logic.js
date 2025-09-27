const gridContainer = document.getElementById("grid-container");
const setGridAmountButton = document.getElementById("set-grid-amount");
const resetGridButton = document.getElementById("reset-button");
const displayGridSize = document.getElementById("display-grid-size");
const allColorButtons = document.querySelectorAll(".color-box");

function makeGrid (gridSize) {
    displayGridSize.textContent = "Grid Size: " + gridSize + "x" + gridSize;

    gridContainer.style.setProperty('--n', gridSize);

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridBox = document.createElement("div");
        gridBox.classList.add("grid");

        gridContainer.appendChild(gridBox);
    }
}

const downPointers = new Set();
function isScreenPressed (event) {
    if (event.pointerType === "mouse") {
        return (event.buttons & 1) === 1;
    }
    return event.pressure > 0 || downPointers.has(event.pointerId);
}

function setBrushColor (brushColor) {
    const allGrids = document.querySelectorAll(".grid");
    allGrids.forEach(grid => {
        grid.addEventListener("pointerenter", (event) => {
            if (isScreenPressed(event)) {
                grid.style.backgroundColor = brushColor;
            }
        });
    });
}

function resetGridColor () {
    const allGrids = document.querySelectorAll(".grid");
    allGrids.forEach(grid => {
        grid.style.backgroundColor = "black";
    });
}

makeGrid(16);
setBrushColor("blue");

setGridAmountButton.addEventListener("click", () => {
    const deleteAllGrids = document.querySelectorAll(".grid");
    deleteAllGrids.forEach(grid => {
        grid.classList.remove("grid");
    });

    let userGridSize = prompt("Please select grid size");
    makeGrid(userGridSize);

    setBrushColor("blue");
});

resetGridButton.addEventListener("click", () => {
    resetGridColor();
})

allColorButtons.forEach(colorBox =>  {
    colorBox.addEventListener("click", (e) => {
        const bgColor = window.getComputedStyle(e.target).backgroundColor;
        setBrushColor(bgColor);
    })
})