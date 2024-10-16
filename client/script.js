function displays() {
    document.getElementById('signUp-div').style.display = "none";
    document.getElementById('login-div').style.display = "none";
}

let formdisplay = 0;
function loginForm() {
    formdisplay = formdisplay+1;
    if(formdisplay%2 == !0) {
        document.getElementById('login-div').style.display = "block";
    }else{
        document.getElementById('login-div').style.display = "none";
    }
}

function signUpForm() {
    formdisplay = formdisplay+1;
    if(formdisplay%2 == !0) {
        document.getElementById('signUp-div').style.display = "block";
    }else{
        document.getElementById('signUp-div').style.display = "none";
    }
}

async function sendEmail(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    console.log("email : ",email);
    alert("chceck your email for the otp");
    window.location = `otp-verification.html`;
    let response = await fetch();
}