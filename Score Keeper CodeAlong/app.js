/**********************************
 *    Declaración de Variables    *
 **********************************/

// Jugador 1.
const playerOne = {
    score: 0,
    display: document.getElementById("player-one-score"),
    button: document.getElementById("player-one-button")
};

// Jugador 2.
const playerTwo = {
    score: 0,
    display: document.getElementById("player-two-score"),
    button: document.getElementById("player-two-button")
};

// Referencia a los botones.
const resetButton = document.getElementById("reset-button");

// Selector de puntajes.
const maxPointsSelector = document.getElementById("max-points");
// Máximo puntaje.
let maxPointsValue = 5;

// Variable que indica si alguien ya ganó.
let isGameOver = false;

/*******************
 *    Funciones    *
 *******************/

 /**
  * Actualiza el puntaje de los jugadores.
  * @param {*} player 
  * @param {*} opponent 
  */
function updateScore(player, opponent) {
    // Si nadie ha ganado el juego...
    if(!isGameOver) {
        // Le agrega uno al score.
        player.score++;
        player.display.textContent = player.score;
        // Si el puntaje es igual al score máximo...
        if(player.score >= maxPointsValue) {
            isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
}

/**
 * Reinicia el juego.
 */
function reset () {
    for (const player of [playerOne, playerTwo]) {
        // Reinicia a 0 los puntajes.
        player.score = 0;
        // Escribe los textos.
        player.display.textContent = player.score;
         // Quita las clases de has-text-success y has-text-danger.
        player.display.classList.remove("has-text-success", "has-text-danger");
        // Desactiva el botón.
        player.button.disabled = false;
    }

    // Reinicia el juego.
    isGameOver = false;
}

/**********************************
 *    Listeners de los botones    *
 **********************************/

playerOne.button.addEventListener("click", function() {
    updateScore(playerOne, playerTwo);
});

playerTwo.button.addEventListener("click", function() {
    updateScore(playerTwo, playerOne);
});

resetButton.addEventListener("click", reset);

/**********************************
 *    Listener para el selector   *
 *           de puntaje           *
 **********************************/

maxPointsSelector.addEventListener("change", function(e) {
    // Actualiza el puntaje máximo.
    maxPointsValue = e.target.value;
    reset();
});