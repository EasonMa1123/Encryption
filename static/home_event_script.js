var Password_input = document.getElementById("signup-Password");
var Password_input_value = Password_input.value;
var password_warning_1 = document.getElementById("Password-warning-1");
var password_warning_2 = document.getElementById("Password-warning-2");


Password_input.onkeyup = function(){

    if (Password_input_value.length < 8 ){
        password_warning_1.innerHTML = "Password must longer than 8";
    } else if (Password_input_value.length > 0){
        password_warning_1.innerHTML = "";
    }
}