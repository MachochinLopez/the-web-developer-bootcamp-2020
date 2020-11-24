// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let product = form.elements.product.value;
    let quantity = form.elements.qty.value;

    let str = `${quantity} ${product}`;
    
    addToList(str);

    document.getElementById("product").value = "";
    document.getElementById("qty").value = "";
});

function addToList(str) {
    let li = document.createElement("li");
    li.innerText = str;
    document.getElementById("list").append(li);
}