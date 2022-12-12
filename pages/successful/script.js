
const urlParams = new URLSearchParams(window.location.search);
const emailValue = urlParams.get('email');
console.log(emailValue);

document.getElementById("email").innerHTML= emailValue;

