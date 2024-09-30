
var w = document.getElementById("Encryption_button");
var x = document.getElementById("Decryption_button");
var y = document.getElementById("encryption");
var z = document.getElementById("decryption");

w.style.display = "None";
x.style.display = "block";
y.style.display = "block";
z.style.display = "None";

function encryptMessage() {
    var message_file = document.getElementById('plain_text_message_file').files[0];
    var message = document.getElementById('message').value;
    var password = document.getElementById('password_to_encrypte').value;
    if (message_file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var fileContent = event.target.result;
            encryptingMessage(fileContent,password);
        };
        reader.readAsText(message_file);
    } else if (message !== "") {
        encryptingMessage(message, password);
    } else {
        alert("Invalid Message");
    }
}

function disable_Input(IDToNotDisable){
    const x_name = "plain_text_message_file"
    const y_name = "image_file"
    const z_name = "message"

    var x = document.getElementById(x_name)
    var y = document.getElementById(y_name)
    var z = document.getElementById(z_name)

    if (x_name == IDToNotDisable){
        y.style.display = "None";
        z.style.display = "None";
        x.style.display = "Block";
    } else if (y_name == IDToNotDisable) {
        x.style.display = "None";
        z.style.display = "None";
        y.style.display = "Block";

    } else if(z_name == IDToNotDisable){
        y.style.display = "None";
        x.style.display = "None";
        z.style.display = "Block";

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
        $('#decrypted_message').text(data.decrypted_message);
    });
}

function show_encryption(){
    var w = document.getElementById("Encryption_button");
    var x = document.getElementById("Decryption_button");
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    
    w.style.display = "None";
    x.style.display = "block";
    y.style.display = "block";
    z.style.display = "None";
}
function show_decryption(){
    var w = document.getElementById("Encryption_button");
    var x = document.getElementById("Decryption_button");
    var y = document.getElementById("encryption");
    var z = document.getElementById("decryption");
    
    w.style.display = "Block";
    x.style.display = "None";
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
        link.download = "sample.txt";
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



