// Definicion de variables
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// inicio juego
init();

function init() {
    // botones
    setupModeButtons();

    //  squares
    setupSquares();

    // reinicio de juego
    reset();
}

// ...

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            
            if (this.textContent === "Fácil") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        // Solo agregar listeners para los primeros 3 cuadros en el modo fácil
        if (i < numSquares) {
            squares[i].addEventListener("click", function() {
                var clickedColor = this.style.backgroundColor;
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correcto!";
                    changeColors(clickedColor);
                    h1.style.backgroundColor = clickedColor;
                    resetButton.textContent = "Jugar de nuevo";
                } else {
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = "Inténtalo de nuevo";
                }
            });
        }
    }
}

// ...



function reset() {
    // colores random
    colors = generateRandomColors(numSquares);

    // seleccionar nuevo random color
    pickedColor = pickColor();

    // cambiar colorDisplay a match pickedColor
    colorDisplay.textContent = pickedColor;

    // cambiar boton de texto
    resetButton.textContent = "New Colors";

    // mensaje de reinicio
    messageDisplay.textContent = "";

    // cambio de colores squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    // Reset h1 background color
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    // Loop through all squares
    for (var i = 0; i < squares.length; i++) {
        // Change each square
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // array
    var arr = [];
    // tomar numero random del array
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    // Return the array
    return arr;
}

function randomColor() {
    // generar un random red, green, and blue value
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    // Return the RGB string
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
