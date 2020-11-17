const colorName = document.getElementById("rgb-color");
const button = document.getElementById("change-button");

function getRandomColor() {
    return {
        r: parseInt(Math.random() * 256),
        g: parseInt(Math.random() * 256),
        b: parseInt(Math.random() * 256)
    };
}

function changeTextAndBackground () {
    // Genera un color RGB al azar.
    let {r, g, b} = getRandomColor();
    let rgbColor = `rgb(${r}, ${g}, ${b})`;
    // Cambia el texto.
    colorName.innerText = rgbColor;
    // Cambia el color al body.
    document.body.style.backgroundColor = rgbColor;
}

// Carga inicial
changeTextAndBackground();

// Agrega el evento click al botón.
button.addEventListener("click", () => {
    changeTextAndBackground();
});