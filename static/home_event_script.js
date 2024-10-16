const Password_input = document.getElementById("signup-Password");


Password_input.onkeyup = function(){
    
    const Password_input_value = document.getElementById('signup-Password').value;
    var password_warning_1 = document.getElementById("Password-warning-1");
    var password_warning_2 = document.getElementById("Password-warning-2");

    if (Password_input_value.length <=8 ){
        password_warning_1.innerHTML = "Password must longer than 8";
    } 
    if(Password_input_value.length > 8){
        password_warning_1.innerHTML = "";
    }
}