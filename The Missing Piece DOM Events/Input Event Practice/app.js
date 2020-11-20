const textBox = document.getElementById("username");
const h1 = document.querySelector("h1");

textBox.addEventListener("input", e => {
    // Si está vacío el input...
    if(e.target.value === "") {
        // Regresa el texto original.
        h1.innerText = "Enter Your Username";
    } else {
        // Cambia el valor del h1.
        h1.innerText = "Welcome, " + e.target.value;
    } 
});