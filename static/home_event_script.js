var Password_input = document.getElementById("signup-Password");


Password_input.onkeyup = function(){
    var Password_input_value = Password_input.value;
    var password_warning_1 = document.getElementById("Password-warning-1");
    var password_warning_2 = document.getElementById("Password-warning-2");


    if (Password_input_value.length < 8 ){
        password_warning_1.innerHTML = "Password must longer than 8";
    } else if (Password_input_value.length > 0){
        password_warning_1.innerHTML = "";
    } else if (Password_input_value.length > 40){
        password_warning_1.innerHTML = "Too long!";
    }
    $.post('/password_strength',{Password:Password_input_value},function(data){
        if (data.score < 20){
            password_warning_2.innerHTML = "Password is not strong enough"
        } else{
            password_warning_2.innerHTML = ""
        }
    })
}