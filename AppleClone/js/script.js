const img = document.querySelector("#iPhone-img");

document.getElementById("silverButton").addEventListener("click", () => {
    img.src = "img/silver.png";
});

document.getElementById("orangeButton").addEventListener("click", () => {
    img.src = "img/orange.png";
});

document.getElementById("blueButton").addEventListener("click", () => {
    img.src = "img/blue.png";
});