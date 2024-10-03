
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
    var image_file = document.getElementById('image_file').files[0];
    var message = document.getElementById('message').value;
    var password = document.getElementById('password_to_encrypte').value;

    if (image_file) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imageContent = event.target.result; // Base64 string of the image
            encryptingMessage(imageContent, password); // Send the image string for encryption
        };
        reader.readAsDataURL(image_file); // Read the image file as Base64
       
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
        if (data.decrypted_message.startsWith('data:image/')) {
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


function reset_file(){
    document.getElementById("image_file").value = ""
    document.getElementById("plain_text_message_file").value = ""
    document.getElementById("message").textContent = ""
}


