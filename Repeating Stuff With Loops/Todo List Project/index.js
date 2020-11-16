// Variable que indica si quiere salir del loop o no.
let quit = false;
// Contiene los pendientes de la lista.
const todos = [];
// Variable que almacena la acción.
let action = null;

while(!quit) {
    // Le pregunta al usuario qué acción quiere hacer.
    action = prompt("What would you like to do?");

    if(action === "new") {
        // Mete al arreglo el valor introducido.
        todos.push(prompt("Enter new todo"));
    } else if(action === "list") {
        // Si la lista tiene TODOs...
        if(todos.length) {
            console.log("***********");
            // Lista todos los TODOs.
            for (let i = 0; i < todos.length; i++) {
                console.log(`${i}: ${todos[i]}`);
            }
            console.log("***********");
        } else {
            console.log("There's no TODOs WOOHOO!");
        }
    } else if(action === "delete") {
        // Recibe el índice a borrar y lo guarda.
        let index = prompt("Enter index of todo to delete");
        // Lo saca de la lista.
        todos.splice(index, 1);
    } else if (action === "quit") {
        quit = true;
        console.log("OK, YOU QUIT THE APP");
    }

    if(quit) {
        break;
    }
}