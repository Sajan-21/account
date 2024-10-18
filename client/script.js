let formDisplay = 0;

function index() {
    document.getElementById('signUp').style.display = "none";
    document.getElementById('login-btn').style.display = "none";
}

function showSignupForm() {
    document.getElementById('login').style.display = "none";
    document.getElementById('signUp').style.display = "block";
    document.getElementById('login-btn').style.display = "block";
    document.getElementById('signup-btn').style.display = "none";
}

function showLoginForm() {
    document.getElementById('signUp').style.display = "none";
    document.getElementById('login').style.display = "block";
    document.getElementById('signup-btn').style.display = "block";
    document.getElementById('login-btn').style.display = "none";
}

async function signUp(event) {
    event.preventDefault();
    let email = document.getElementById('signupEmail').value;
    try {
        let body = {
            name : document.getElementById('signupName').value,
            email : document.getElementById('signupEmail').value,
            password : document.getElementById('signupPassword').value,
        }
        let stringified_body = JSON.stringify(body);
        console.log("stringified_body : ",stringified_body);
        let response = await fetch('/user',{
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : stringified_body
        });
        console.log("response : ",response);
        let parsed_response = await response.json();
        console.log("parsed_response : ",parsed_response);
        if(parsed_response.statusCode === 200) {
            alert(parsed_response.message);
            window.location = `otp-verification.html?email=${email}`;
        }
    } catch (error) {
        console.log("error : ",error);
        // alert(error.message ? error.message : "something went wrong");
    }
}

async function verifyOtp(event) {
    event.preventDefault();
    let queryString = window.location.search;
    let url_params = new URLSearchParams(queryString);
    let email = url_params.get("email");

    let body = {
        email : url_params.get("email"),
        otp : document.getElementById('otp').value
    }
    // console.log("body : ",body);
    let stringified_body = JSON.stringify(body);
    // console.log("stringified_body : ",stringified_body);
    try {
        let response = await fetch('/otp-verification',{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : stringified_body
        });
        // console.log("response : ",response);
        let parsed_response = await response.json();
        // console.log("parsed_response : ",parsed_response);
        if(parsed_response.statusCode === 200) {
            alert(parsed_response.message);
            window.location = `home.html?_id=${parsed_response.data}`;
        }else{
            alert(parsed_response.message);
        }
    } catch (error) {
        console.log("error : ",error);
    }
}

async function home() {
    let url_params = new URLSearchParams(window.location.search);
    let _id = url_params.get("_id");
    console.log("_id : ",_id);
    
}