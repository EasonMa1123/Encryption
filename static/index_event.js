function direct_to_testing(){
    document.location.href = "/testing";
}



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

function disable_file_input(){
    document.getElementById().style.display = "None"
}

function enable_file_input(){
    document.getElementById().style.display = "initial"
}