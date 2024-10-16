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
    let response = await fetch('/sendOtp',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/text'
        },
        body : email
    });
    let parsed_response = await response.json();
    console.log("parsed_response : ",parsed_response);
    let otp = parsed_response.data;
    // console.log("otp : ",otp);
    
}