const name = document.getElementById("name");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const confPass = document.getElementById("confPass");
const submit = document.getElementById("submit");
const form = document.getElementById("form");

let checkName = false,
    checkEmail = false,
    checkPass = false,
    checkConfPass = false;



name.addEventListener("input", (e) => {
    let value = e.target.value;
    let message = document.getElementById("name-error-message");
    if (value.length === 0) {
        e.target.style.border = "none";
        message.innerHTML = "";
        checkName = false
    }
    else if (value.length < 5 || value.length > 15) {
        e.target.style.border = "1px solid red";
        message.innerHTML = "Username must consist of 5 to 15 characters";
        checkName = false
    } else if (!(/^[A-Za-z0-9]*$/.test(value))) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "only letters and numbers are allowed";
        checkName = false
    } else if (!isNaN(value.charAt(0)) || !isNaN(value.charAt(value.length - 1))) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "no numbers at the beginning or the end";
        checkName = false
    } else {
        e.target.style.border = "1px solid green"
        message.innerHTML = "";
        checkName = true;
    }
})
email.addEventListener("input", (e) => {
    let value = e.target.value;
    let message = document.getElementById("email-error-message");
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (value.length === 0) {
        e.target.style.border = "none";
        message.innerHTML = "";
        checkEmail = false
    }
    else if (!filter.test(value)) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "please enter a valid email address";
        checkEmail = false
    } else {
        e.target.style.border = "1px solid green"
        message.innerHTML = "";
        checkEmail = true
    }
})

pass.addEventListener("input", (e) => {
    let value = e.target.value;
    let message = document.getElementById("pass-error-message");
    let filter = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/
    let symbolFilter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (value.length === 0) {
        e.target.style.border = "none";
        message.innerHTML = "";
        checkPass = false
    }
    else if (value.length < 8) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "Password must be at least 8 characters";
        checkPass = false
    } else if (!filter.test(value) || !symbolFilter.test(value)) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "it is require at least one uppercase letter, one lower case letter, one number and one symbol.";
        checkPass = false
    } else {
        e.target.style.border = "1px solid green"
        message.innerHTML = "";
        checkPass = true;
    }
})


confPass.addEventListener("input", (e) => {
    let value = e.target.value;
    let message = document.getElementById("confPass-error-message");
    if (value.length === 0) {
        e.target.style.border = "none";
        message.innerHTML = "";
        checkConfPass = false
    }
    else if (value !== pass.value) {
        e.target.style.border = "1px solid red"
        message.innerHTML = "it must be the same as password";
        checkConfPass = false
    } else {
        e.target.style.border = "1px solid green"
        message.innerHTML = "";
        checkConfPass = true;
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (checkName && checkPass && checkConfPass && checkEmail) {
        try {
            let response = await fetch('https://goldblv.com/api/hiring/tasks/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": name.value,
                    "email": email.value,
                    "password": pass.value,
                    "password_confirmation": confPass.value
                })
            })
            let user = await response.json()
            console.log(JSON.stringify(user))
            window.location.replace(`../successful/Successful.html?email=${email.value}`)
        } catch (err) {
            alert("it was a problem in server, please try again");
        }

    } else {
        alert("please enter true data");
    }
});