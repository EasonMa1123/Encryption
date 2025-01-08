function login_open(){
    document.getElementById("signup-form").style.display = "None";
    document.getElementById("login-form").style.display = "flex";

}

function signup_open(){
    document.getElementById("signup-form").style.display = "flex";
    document.getElementById("login-form").style.display = "None";

}


function submit_new_user_data(){
    let Username = document.getElementById("signup-Username").value
    let Password = document.getElementById("signup-Password").value
    let Confirm_password = document.getElementById("ConfirmPassword").value
    const Confirm_email = document.getElementById("signup-email").value


    alert("e")
    if (Username == "") {
        alert("please enter a username")
    }else if(Password == ""){
        alert("Please enter a password")
    }else if (Password != Confirm_password){
        alert("Invalid Password confirmation!")
    }else{

        $.post('/email_verification',{Email:Confirm_email}, function(data) {

            let user_code = prompt("Email sent,please enter the code")
            if (user_code == data.code){
                $.post('/insertNewUser',{ userName: Username, Password:Password }, function(data) {
                    if (data.Feedback == "Invalid Username,This Username had been used "){
                        alert("Invalid Username,This Username had been used ")
                    } else {
                        alert("Vaild Signup,please login to enter!")}});
                }else{alert("Invalid Code,please submit again!")}
        }
    )}

}

    


function login(){
    let Username = document.getElementById("login-Username").value
    let Password = document.getElementById("login-Password").value

    $.post('/CheckUserPassword',{ userName:Username,Password:Password }, function(data){
        if (data.check == true){
            sessionStorage.setItem("Username",Username)
            sessionStorage.setItem("Password",Password)
            document.location.href = "/index";
            Username = "";
            Password = "";
            
        } else {
            alert("Incorrect Password/Username")
        }
    })


}