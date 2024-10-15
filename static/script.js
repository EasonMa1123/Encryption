//setup

var y = document.getElementById("encryption");
var z = document.getElementById("decryption");
var a = document.getElementById("plain_text_message_file_label");
var b = document.getElementById("image_file_label");



y.style.display = "block";
z.style.display = "None";
a.style.display = "None";
b.style.display = "None";


//home.html





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

    if (Password != Confirm_password){
        alert("Invalid Password confirmation!")
    } else{
        $.post('/insertNewUser',{ userName: Username, Password:Password }, function(data) {
            if (data.Feedback == "Invalid Username,This Username had been used "){
                alert("Invalid Username,This Username had been used ")
            }
    });}

}

function login(){
    let Username = document.getElementById("login-Username").value
    let Password = document.getElementById("login-Password").value

    $.post('/CheckUserPassword',{ userName:Username,Password:Password }, function(data){
        if (data.check == true){
            document.location.href = "/index";
            Username = "";
            Password = "";
            
        } else {
            alert("Incorrect Password/Username")
        }
    })


}

// index.html



function menu_open() {
    document.getElementById('sidebar').style.display = "block";


}

function menu_close() {
    document.getElementById('sidebar').style.display = "None";


}

function encryptMessage() {
    var message_file = document.getElementById('plain_text_message_file').files[0];
    var image_file = document.getElementById('image_file').files[0];
    var message = document.getElementById('message').value;
    var password = document.getElementById('password_to_encrypte').value;

    if(message.length ==1 ){
        alert("Message too short!")

    }else if (image_file) {
        var processing_text = document.getElementById("Processing_display")
        processing_text.style.display = "block"
        processing_text.value = "Loading..."
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageContent = event.target.result; // Base64 string of the image
            encryptingMessage(imageContent, password); // Send the image string for encryption
        };
        reader.readAsDataURL(image_file); // Read the image file as Base64
       processing_text.style.display = "initial"
    


    } else if (message_file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var fileContent = event.target.result;
            encryptingMessage(fileContent, password);
        };
        reader.readAsText(message_file);
    } else if (message !== "") {
        encryptingMessage(message, password);
    } else {
        alert("Invalid Message or Image");
    }
}

function disable_Input(IDToNotDisable){
    const x_name = "plain_text_message_file"
    const x_label_name = "plain_text_message_file_label"
    const y_name = "image_file"
    const y_labal_name = "image_file_label"
    const z_name = "message"

    var x = document.getElementById(x_name)
    var x_label = document.getElementById(x_label_name)
    var y = document.getElementById(y_name)
    var y_labal = document.getElementById(y_labal_name)
    var z = document.getElementById(z_name)

    if (x_name == IDToNotDisable){
        
        y_labal.style.display = "None";
        z.style.display = "None";
        
        x_label.style.display = "initial";
    } else if (y_name == IDToNotDisable) {
        
        x_label.style.display = "None";
        z.style.display = "None";
        
        
        y_labal.style.display = "initial";

    } else if(z_name == IDToNotDisable){
        
        
        y_labal.style.display = "None";
        x_label.style.display = "None";
        z.style.display = "initial";

    }
}





function encryptingMessage(message, password) {
    $.post("/encrypt", { message: message,password:password }, function(data) {
        $('#encrypted_message').text(data.encrypted_message);
        $('#key').text(data.key);
    });
}

function decryptMessage() {
    var message_file = document.getElementById('decrypt_message_file').files[0];
    var message = $('#decrypt_message').val();
    var key = $('#decrypt_key').val();
    var password = document.getElementById('password_to_decrypte').value;

    if (message_file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var fileContent = event.target.result;
            decryptingMessage(fileContent, key, password);
        };
        reader.readAsText(message_file);
    } else if (message !== "") {
        decryptingMessage(message, key, password);
    } else {
        alert("Invalid Message");
    }
}



function decryptingMessage(message, key, password) {
    $.post("/decrypt", { message: message, key: key, password: password }, function(data) {
        if(Number.isInteger(data.decrypted_message)&& data.decrypted_message == 405){
            alert("Invalid key/Password, unable to decrypte")

        }else if (data.decrypted_message.startsWith('data:image/')) {
            // If the decrypted message is an image (Base64 string)
            showDecryptedImage(data.decrypted_message);
            document.getElementById("download_decrypt").style.display = "None"
        } else {
            // If it's a text message
            $('#decrypted_message').text(data.decrypted_message);
            document.getElementById("download_decrypt").style.display = "initial"
        }
    });
}

function showDecryptedImage(base64Image) {
    // Create an img element and set the src to the Base64 string
    var img = document.createElement('img');
    img.src = base64Image;
    img.alt = "Decrypted Image";
    img.style.maxWidth = "100%";
    
    // Clear previous decrypted content and append the image
    var decryptedMessageContainer = document.getElementById('decrypted_message');
    decryptedMessageContainer.innerHTML = ""; // Clear existing content
    decryptedMessageContainer.appendChild(img);

    // Optionally, provide a download button for the image
    var downloadBtn = document.createElement('button');
    downloadBtn.textContent = "Download Image";
    downloadBtn.onclick = function() {
        downloadImage(base64Image);
    };
    decryptedMessageContainer.appendChild(downloadBtn);
}

function downloadImage(base64Image) {
    // Create a link to download the image
    const link = document.createElement("a");
    link.href = base64Image;
    link.download = "decrypted_image.png"; // Default name for the downloaded image
    link.click();
}

function show_encryption(){
    
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    document.getElementById('Encryption_button_label').style.backgroundColor = "#13314c";
    document.getElementById('Decryption_button_label').style.backgroundColor = "#ffffff";
    document.getElementById('Encryption_button_label').style.color= "#ffffff";
    document.getElementById('Decryption_button_label').style.color= "#000000";

    y.style.display = "block";
    z.style.display = "None";
}
function show_decryption(){
    
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    document.getElementById('Decryption_button_label').style.backgroundColor = "#13314c";
    document.getElementById('Encryption_button_label').style.backgroundColor = "#ffffff";
    document.getElementById('Decryption_button_label').style.color= "#ffffff";
    document.getElementById('Encryption_button_label').style.color= "#000000";
    

    y.style.display = "None";
    z.style.display = "Block";
}
function Copy_text(ID){
    var copyText = document.getElementById(ID).textContent;    
    navigator.clipboard.writeText(copyText);

    if (copyText != "") {
        alert("Copied");
    } else {
        alert("No Text to copy!");
    }
}

function Create_txt_file (ID){
    const message= document.getElementById(ID).textContent;
    if (message != ""){
        const link = document.createElement("a");
        const content = message;
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "CipherText.endec";
        link.click();
        URL.revokeObjectURL(link.href);
    } else {
        alert("No Text to download!")
    }
}

function ConvertImageToText(){
    const img = new Image();
    img.src = document.getElementById("image_file");
    img
    .decode()
    
    .catch((encodingError) => {
        alert("Invalid Image")
    });

    return img

}


function reset_file(){
    console.log("Here")
    // Reset file inputs
    document.getElementById("image_file").value = "";
    document.getElementById("plain_text_message_file").value = "";

    // Reset text content (for textarea and text inputs)
    document.getElementById("message").value = ""; // Reset textarea for message input
    document.getElementById("password_to_encrypte").value = ""; // Reset encryption password input
    document.getElementById("decrypt_message").value = ""; // Reset decryption message textarea
    document.getElementById("decrypt_key").value = ""; // Reset decryption key input
    document.getElementById("password_to_decrypte").value = ""; // Reset decryption password input

    // Clear any encrypted/decrypted message display
    document.getElementById("encrypted_message").textContent = "";
    document.getElementById("decrypted_message").textContent = "";
    document.getElementById("key").textContent = "";

}

function logout(){
    document.location.href = "/";
}
