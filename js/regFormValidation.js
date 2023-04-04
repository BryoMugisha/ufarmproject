const Validate = (event) => {
    let error = 0
     // pick inputs
    let password = document.getElementById("password");
    let role = document.getElementById("role")


    // pick error sections
    let passError = document.getElementById("passErr");
    let roleError = document.getElementById("roleErr");


    // password validations
    if (password.value == "") {
        password.style.border = "1px solid red"
        passError.textContent = "password is required";
        passError.style = "color:red; font-size:11px";
        error++
    } else if (password.value.length < 5)
    {
        password.style.border = "1px solid red"
        passError.textContent = "password must be more than 5";
        passError.style = "color:red; font-size:11px";
        error++ 
    }   else if (password.value.length > 5)
    {
        password.style.border = "1px solid red"
        passError.textContent = "password must be less than 15";
        passError.style = "color:red; font-size:11px";
        error++ 
    } else {
        password.style.border = "1px solid red"
        passError.textContent = "";
    }

    //role validations
    if (role.value == ""){
        role.style.border = "1px solid red";
        roleError.textContent = "please select a role";
        roleError.style = "color: red; font-size:11px"
    // return false
    error++
    }else {
        role.style.border = "1px solid green"
        roleError.textContent = "";
    }

    if(error > 0){
        event.preventDefault()
    }
}