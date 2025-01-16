



// index.html

function check_invalid_enter(){
    if(sessionStorage.getItem("Username") == null){
        alert("What are you doing in here,this is not your place,leave! Thank You :)")
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
            if (imageFileSizeKB > 250) {
                alert("Image file size exceeds the 250KB limit.");
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





function logout(){
    document.location.href = "/login";
    sessionStorage.setItem("",Username)
    sessionStorage.setItem("",Password)
}
