// selecao de elementos:
const submitButton = document.querySelector("#inputButton");
const textBox = document.querySelector("#inputText");
const submitsDiv = document.querySelector("#submits");

// eventos:
submitButton.addEventListener("click", function(){
    const textBoxValue = textBox.value;
    //caso o usuario nao digite nada, nao gera:
    if(!textBoxValue){
        return;
    }
    //sempre apaga o qr code antes de gerar outro:
    const oldQrCode = document.querySelector("#qr-code-img");
    if(oldQrCode){
        oldQrCode.remove();
    }
    //por conta de uma demora da api, devemos deixar o usuario saber que o qr code esta sendo gerado:
    submitButton.value = "Gerando QR Code...";
    //usando uma API para gerar o qr code (goqr.me/api/):
    const newSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textBoxValue}`;
    //adiciona o qr code com appendChild;
    const img = document.createElement("img");
    img.src = newSrc;
    img.id = "qr-code-img";
    img.alt = "Qr code";
    submitsDiv.appendChild(img);
    //volta o value padrao do botao:
    submitButton.value = "Gerar QR Code";
})