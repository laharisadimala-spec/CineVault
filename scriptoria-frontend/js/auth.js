// SIGNUP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(e){
        e.preventDefault();

        const inputs = signupForm.querySelectorAll("input");
        const user = {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value
        };

        localStorage.setItem("scriptoriaUser", JSON.stringify(user));
        alert("Account Created Successfully 🎉");
        window.location.href = "login.html";
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = loginForm.querySelectorAll("input")[0].value;
        const password = loginForm.querySelectorAll("input")[1].value;

        const storedUser = JSON.parse(localStorage.getItem("scriptoriaUser"));

        if(storedUser && storedUser.email === email && storedUser.password === password){
            alert("Login Successful 🎬");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Credentials ❌");
        }
    });
}