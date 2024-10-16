var Password_input = document.getElementById("signup-Password");
var Password_input_value = Password_input.value;
var password_warning = document.getElementById("Password-warning");

Password_input.onkeyup = function(){
    
    
    if (Password_input_value.length < 8 ){
        password_warning.innerHTML = "Password must longer than 8";
    }

}