//selecao de elementos:
const multForm = document.querySelector("#mult-form");
const numberInput = document.querySelector("#number");
const multInput = document.querySelector("#multiplicator");
const multTable = document.querySelector("#mult-operations");

const multTitle = document.querySelector("#mult-title span");

// funcoes:
const createTable = (number, multNumber) => {
    multTable.innerHTML = ""; //limpa o html, nesse caso tira a frase.
    for(let i = 1; i<=multNumber; i++){
        const result = number * i;

        const template = 
        `<div class="row">
            <div class="operation">${number} x ${i} = </div>
            <div class="result">${result}</div>
        </div>`;

        const parser = new DOMParser();
        const htmlTemplate = parser.parseFromString(template, "text/html");
        const row = htmlTemplate.querySelector(".row");
        multTable.appendChild(row);
    }
    multTitle.innerText = number;
}

// eventos:
multForm.addEventListener("submit", function(e){
    e.preventDefault();
    const multiplicationNumber = +numberInput.value;
    const multiplicatorNumber = +multInput.value;

    if (!multiplicationNumber || !multiplicatorNumber){
        return; //se faltar algun valor, para aqui.
    }
    createTable(multiplicationNumber, multiplicatorNumber);
});