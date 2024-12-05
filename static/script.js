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

    if (Username == "") {
        alert("please enter a username")
    }else if(Password == ""){
        alert("Please enter a password")
    }else if (Password != Confirm_password){
        alert("Invalid Password confirmation!")
    } else{
        $.post('/insertNewUser',{ userName: Username, Password:Password }, function(data) {
            if (data.Feedback == "Invalid Username,This Username had been used "){
                alert("Invalid Username,This Username had been used ")
            } else {
                alert("Vaild SignUp,please login to enter!")
            }
            
    });}

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

// index.html


function setting_on() {
    document.getElementById("overlay-setting").style.display = "block";
    menu_close();

}
  
function setting_off() {
    document.getElementById("overlay-setting").style.display = "none";
} 


function menu_open() {
    document.getElementById('sidebar').style.display = "block";
    document.getElementById('Username-display').innerHTML = sessionStorage.getItem("Username")


}

function menu_close() {
    document.getElementById('sidebar').style.display = "None";
    document.getElementById('Username-display').innerHTML = ""


}

function set_dark_theme(){
    document.body.style.backgroundImage = "linear-gradient(#081f37,#0d2f53,#081f37)";

}

function set_bright_theme(){
    document.body.style.backgroundImage = "linear-gradient(#113f70,#ffffff,#113f70)";
}

function set_big_font(){
    document.body.style.fontSize = "large"
}

function set_medium_font(){
    document.body.style.fontSize = "medium"
}


function set_small_font(){
    document.body.style.fontSize = "small"
}


function ChangeUserName(){
    const old_username = document.getElementById("Current-username").value;
    const new_username = document.getElementById("New-username").value;

    if (old_username == "" || new_username == ""|| old_username == " " || new_username == " "  ){
        alert("Invalid Username ")
    }
    else if (old_username == new_username){
        alert("Same Username!")
    } else if(old_username == sessionStorage.getItem("Username")){
        $.post("/access_account_detail",{Username:old_username},function(data){
            const id = data.ID
            $.post("/update_account_username",{id:id,New_username:new_username})
            sessionStorage.setItem("Username",new_username)
            alert("UserName Changed")
        })
    }
}


function ChangePassword(){
    const old_Password = document.getElementById("Current-password").value;
    const new_Password = document.getElementById("New-password").value;

    if (old_Password == new_Password){
        alert("Same Password!")
    } else if(old_Password == sessionStorage.getItem("Password")){
        $.post("/access_account_detail",{Username:sessionStorage.getItem("Username")},function(data){
            $.post("/password_Update",{id:data.ID,New_password:new_Password})
            sessionStorage.setItem("Password",new_Password)
            alert("Password Changed")
        })
    } else{
        alert("Invalid Password change")
    }
}


function save_setting(){
    $.post('/access_account_detail',{Username:sessionStorage.getItem("Username")},function(data){
        const ID = data.ID

    
        if (document.body.style.backgroundImage == "linear-gradient(rgb(17, 63, 112), rgb(255, 255, 255), rgb(17, 63, 112))"){
            var Theme = "bright"
        }else if(document.body.style.backgroundImage == "linear-gradient(rgb(8, 31, 55), rgb(13, 47, 83), rgb(8, 31, 55))"){
            var Theme = "dark"
        } 

        const FontSize = document.body.style.fontSize;
        $.post('/update_user_setting',{id:ID,theme:Theme,fontSize:FontSize});
    })
}


function access_setting(){
    check_invalid_enter()
    $.post('/access_account_detail',{Username:sessionStorage.getItem("Username")},function(data){
        const ID = data.ID
        $.post('/access_user_setting',{id:ID},function(data){
            if(data.Theme != null){
                const Theme = data.Theme
                const FontSize = data.Fontsize
                if (Theme == "bright"){
                    set_bright_theme()
                    document.getElementById('bright-theme').checked = true;
                } else{
                    document.getElementById('dark-theme').checked = true;
                }
                document.body.style.fontSize = FontSize
                if (data.Fontsize == "large"){
                    document.getElementById('big-font').checked = true;
                } else if (data.Fontsize == "medium"){
                    document.getElementById('medium-font').checked = true;
                } else if (data.Fontsize == "small"){
                    document.getElementById('small-font').checked = true;
                }
            }
        })
    })
}

function check_invalid_enter(){
    if(sessionStorage.getItem("Username") == null){
        alert("get out")
        logout()
    }
}

// Function to read a file as Base64 using promises, with progress tracking
function readFileAsBase64(file, progressCallback) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onprogress = function(event) {
            if (event.lengthComputable && progressCallback) {
                var progress = Math.round((event.loaded / event.total) * 50); // File reading contributes 50%
                progressCallback(progress); // Update progress bar (up to 50%)
            }
        };
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

// Function to read a text file with progress tracking
function readFileAsText(file, progressCallback) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onprogress = function(event) {
            if (event.lengthComputable && progressCallback) {
                var progress = Math.round((event.loaded / event.total) * 50); // File reading contributes 50%
                progressCallback(progress); // Update progress bar (up to 50%)
            }
        };
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsText(file);
    });
}

// Simulate encryption with progress updates (takes 50% of the progress bar)
function encryptingMessageWithProgress(content, password, progressCallback) {
    return new Promise((resolve) => {
        let encryptionProgress = 0;
        const encryptionInterval = setInterval(() => {
            encryptionProgress += 10; // Simulate incremental encryption progress
            progressCallback(50 + encryptionProgress); // Update progress bar from 50% to 100%
            if (encryptionProgress >= 50) { // Once encryption completes, stop progress
                clearInterval(encryptionInterval);
                resolve(); // Resolve the promise once done
            }
        }, 2000); // Simulate encryption process taking some time (2 seconds total)
    });
}

// Main encryptMessage function with async/await and progress bar
async function encryptMessage() {
    var message_file = document.getElementById('plain_text_message_file').files[0];
    var image_file = document.getElementById('image_file').files[0];
    var message = document.getElementById('message').value;
    var password = document.getElementById('password_to_encrypte').value;

    var progressBar = document.getElementById("progressBar");
    var processing_text = document.getElementById("Processing_display");

    // Reset progress bar
    progressBar.value = 0;
    progressBar.style.display = "none";

    if (message.length == 1) {
        alert("Message too short!");
        return;
    }

    try {
        if (image_file) {
            var imageFileSizeKB = image_file.size / 1024; // Convert to KB
            if (imageFileSizeKB > 100) {
                alert("Image file size exceeds the 200KB limit.");
                return; // Reject and stop further processing
            }
            // Display loading text and show progress bar
            processing_text.style.display = "block";
            processing_text.textContent = "Loading...";
            progressBar.style.display = "block";

            // Convert image to Base64 and update progress bar
            var imageContent = await readFileAsBase64(image_file, (progress) => {
                progressBar.value = progress;
            });
            encryptingMessage(imageContent, password);
            // Simulate encryption and update progress bar

            await encryptingMessageWithProgress(imageContent, password, (progress) => {
                progressBar.value = progress;
            });


        } else if (message_file) {
            // Display loading text and show progress bar
            processing_text.style.display = "block";
            processing_text.textContent = "Loading...";
            progressBar.style.display = "block";

            // Read the text file and update progress bar
            var fileContent = await readFileAsText(message_file, (progress) => {
                progressBar.value = progress;
            });
            encryptingMessage(fileContent, password);
            // Simulate encryption and update progress bar
            await encryptingMessageWithProgress(fileContent, password, (progress) => {
                progressBar.value = progress;


            });
            

        } else if (message !== "") {
            // No file selected, encrypt plain text message (simulate progress)
            progressBar.style.display = "block";
            if (message.length > 10000)
                await encryptingMessageWithProgress(message, password, (progress) => {
                progressBar.value = progress;
                });
            encryptingMessage(message, password);

        } else {
            alert("Invalid Message or Image");
        }
    } catch (error) {
        console.error("Error while reading file:", error);
        alert("An error occurred during file processing");
    } finally {
        // Hide the progress bar and processing text after the operation
        progressBar.style.display = "none";
        processing_text.style.display = "initial";
        processing_text.textContent = "Completed";
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
    document.getElementById("Processing_display").style.display = "None";

}




function logout(){
    document.location.href = "/login";
}


function disable_file_input(){
    document.getElementById().style.display = "None"
}

function enable_file_input(){
    document.getElementById().style.display = "initial"
}