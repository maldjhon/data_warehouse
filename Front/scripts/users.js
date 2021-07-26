/*Definition variables*/
var buttonRegister = document.getElementById("register");
var buttonRegisterEdit = document.getElementById("registerEdit");
var buttonAddUser = document.getElementById("buttonAddUser");
var cancel = document.getElementById("cancel");
var cancelEdit = document.getElementById("cancelEdit");
var continues = true;
var continueEmail = true;
var continuePassword = true;
var continuesEdit = true;
var continueEmailEdit = true;
var continuePasswordEdit = true;
var arrayUsers = new Array();
var arrayUsersCheck = new Array();
var countCheck = 0;
/*Add Event Listener*/
buttonRegister.addEventListener("click",()=>{
    validateInputs();
});
buttonRegisterEdit.addEventListener("click",()=>{
    sendEditRecord();
});
buttonAddUser.addEventListener("click",()=>{
    let popupSaveUser = document.getElementById("popupSaveUser");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    popupSaveUser.checked = true;
});
cancel.addEventListener("click",()=>{
    let popupSaveUser = document.getElementById("popupSaveUser");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    popupSaveUser.checked = false;
});
cancelEdit.addEventListener("click",()=>{
    let popupSaveUser = document.getElementById("popupSaveUserEdit");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    popupSaveUser.checked = false;
});
document.addEventListener("click",(event)=>{
    let className = event.target.className;
    let id = event.target.id;
    if(className == "inputs"){
        document.getElementById("code").style.display = "none";
        document.getElementById("message").style.display = "none";
        document.getElementById("correct").style.display = "none";
        document.getElementById("codeEdit").style.display = "none";
        document.getElementById("messageEdit").style.display = "none";
        document.getElementById("correctEdit").style.display = "none";
    }else if(className == "edit"){
        editRecordUser(id);
        localStorage.setItem("idUser",id);
    }else if(className == "delete"){
        deleteRecordUser(id);
    }else if(className == "check ocupation"){
        selectionUser(event);
    }
})
/*Fetchs async functions*/
async function registerUser(authorization, body){
    let url = 'http://localhost:3000/api/users/register';
    const resp = await fetch (url,{
        method:'POST',
        headers:{
            authorization: "Bearer "+authorization,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await resp.json();
    return data;
}

async function getUsers(authorization){
    let url = 'http://localhost:3000/api/users';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function updateUsers(authorization,body,id){
    let url = `http://localhost:3000/api/users/update/${id}`;
    const resp = await fetch (url,{
        method:'PUT',
        headers:{
            authorization: "Bearer "+authorization,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = resp;
    return data;
}

async function deleteUser(authorization,id){
    let url = `http://localhost:3000/api/users/delete/${id}`;
    const resp = await fetch (url,{
        method:'DELETE',
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = resp;
    return data;
}
/*Load Page*/
let authorizationUsers = sessionStorage.getItem("authorization");
let getUsersAll = getUsers(authorizationUsers);
getUsersAll.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        getUsersData(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let spanUsers = document.getElementById("spanUsers");
    spanUsers.innerText = "Código: "+code+". Mensaje: "+message;
    spanUsers.style.display = "block";
})
/*Functions*/
function validateInputs(){
    let valueEmail = document.getElementById("email").value;
    let valuePassword = document.getElementById("password").value;
    let valueRepeatPassword = document.getElementById("repeatPassword").value;
    let valueFirstName = document.getElementById("firstName").value;
    continueEmail = validateInputsDataEmail(valueEmail);
    continuePassword = validateInputsPassword(valuePassword, valueRepeatPassword);
    continues = validateInputsRequired(valueEmail,valueFirstName);
    if(continueEmail == true && continuePassword == true && continues == true){
        createUser()
    }
}

function createUser(){
    let authorization = sessionStorage.getItem("authorization");
    let valueFirstName = document.getElementById("firstName").value;
    let ValueLastName = document.getElementById("lastName").value;
    let valueEmail = document.getElementById("email").value;
    let valueProfile = document.getElementById("profile").value;
    let valuePassword = document.getElementById("password").value;
    let name = valueFirstName+" "+ValueLastName;
    let bodyRequest = new Object;
    bodyRequest.name = name;
    bodyRequest.email = valueEmail;
    bodyRequest.profile = valueProfile;
    bodyRequest.password = valuePassword;
    let register = registerUser(authorization,bodyRequest);
    register.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            location.reload();
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        document.getElementById("code").innerText = code;
        document.getElementById("message").innerText = message;
        document.getElementById("code").style.display = "flex";
        document.getElementById("message").style.display = "flex";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
    });
}

function validateInputsDataEmail(inputEmail){
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.]/;
    let match = inputEmail.match(validEmail);
    if(match == null || match == "" || match == undefined){
        document.getElementById("message").innerText = "Error en datos ingresados";
        document.getElementById("message").style.display = "block";
        return false;
    }else{
        return true
    }
}

function validateInputsPassword(inputPassword, inputRepeat){
    if(inputPassword != inputRepeat){
        document.getElementById("message").innerText = "La contraseña no coincide por favor intentar nuevamente";
        document.getElementById("message").style.display = "block";
        return false;
    }else{
        return true
    }
}

function validateInputsDataEmailEdit(inputEmail){
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.]/;
    let match = inputEmail.match(validEmail);
    if(match == null || match == "" || match == undefined){
        document.getElementById("messageEdit").innerText = "Error en datos ingresados";
        document.getElementById("messageEdit").style.display = "block";
        return false;
    }else{
        return true
    }
}

function validateInputsPasswordEdit(inputPassword, inputRepeat){
    if(inputPassword != inputRepeat){
        document.getElementById("messageEdit").innerText = "La contraseña no coincide por favor intentar nuevamente";
        document.getElementById("messageEdit").style.display = "block";
        return false;
    }else{
        return true
    }
}

function validateInputsRequired(valueEmail,valueFirstName,ValueLastName){
    if(valueFirstName == null || valueFirstName == "" || valueFirstName == undefined || valueEmail == null || valueEmail == "" || valueEmail == undefined){
        document.getElementById("message").innerText = "Los campos nombre, email deben estar diligenciados";
        document.getElementById("message").style.display = "block";
        return false;
    }else{
        return true
    }
}

function getUsersData(data){
    let divContainer = document.getElementById("usersData");
    let i = 0;
    for(i; i < data.length; i++){
        let div = document.createElement("div");
        div.className = "usersData";
        let id = data[i].id;
        let name = data[i].userName;
        let email = data[i].email;
        let positionName = data[i].positionName;
        div.innerHTML = `<input type="checkbox" name="check" class="check ocupation" id="check_${id}">
        <span class="titles ocupation">${name}</span>
        <span class="titles ocupation">${email}</span>
        <span class="titles ocupation phone">${positionName}</span>
        <div class="actions ocupation">
            <span class="edit" id="${id}">Editar</span>
            <span class="delete" id="${id}">Eliminar</span>
        </div>`;
        divContainer.appendChild(div);
        arrayUsers.push(data[i]);
    }
}

function editRecordUser(id){
    let check = document.getElementById("popupSaveUserEdit");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    let index = indexOfArrayId(arrayUsers, id);
    let name = arrayUsers[index].userName;
    let firstName;
    let lastName;
    let length = name.length;
    let startIndex = name.indexOf(" ",0);
    if(startIndex != -1){
        firstName = name.substring(0,startIndex);
        lastName = name.substring(startIndex+1,length);
    }else{
        firstName = name;
        lastName = "";
    }
    document.getElementById("firstNameEdit").value = firstName;
    document.getElementById("lastNameEdit").value = lastName;
    document.getElementById("emailEdit").value = arrayUsers[index].email;
    document.getElementById("profileEdit").value = arrayUsers[index].positionName;
    check.checked = true;
}

function sendEditRecord(){
    let valueEmail = document.getElementById("emailEdit").value;
    let valuePassword = document.getElementById("passwordEdit").value;
    let valueRepeatPassword = document.getElementById("repeatPasswordEdit").value;
    if(valuePassword != null && valuePassword != "" && valuePassword != undefined && valueRepeatPassword != null || valueRepeatPassword != "" || valueRepeatPassword != undefined){
        continuePasswordEdit = validateInputsPasswordEdit(valuePassword, valueRepeatPassword);
    }
    continueEmailEdit = validateInputsDataEmailEdit(valueEmail);
    if(continueEmailEdit == true && continuePasswordEdit == true){
        updateUser();
    }
}

function updateUser(){
    let authorization = sessionStorage.getItem("authorization");
    let idUser = localStorage.getItem("idUser");
    let valueFirstName = document.getElementById("firstNameEdit").value;
    let ValueLastName = document.getElementById("lastNameEdit").value;
    let valueEmail = document.getElementById("emailEdit").value;
    let valueProfile = document.getElementById("profileEdit").value;
    let valuePassword = document.getElementById("passwordEdit").value;
    let name = valueFirstName+" "+ValueLastName;
    let bodyRequest = new Object;
    bodyRequest.name = name;
    bodyRequest.email = valueEmail;
    bodyRequest.profile = valueProfile;
    if(valuePassword != ""){        
        bodyRequest.password = valuePassword;
    }
    let updateUserRecord = updateUsers(authorization,bodyRequest,idUser);
    updateUserRecord.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.status;
        let message = data.statusText;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function deleteRecordUser(id){
    let authorization = sessionStorage.getItem("authorization");
    let deleteRecord = deleteUser(authorization,id);
    deleteRecord.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.status;
        let message = data.statusText;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function selectionUser(event){
    let id = event.target.id;
    let check = event.target.checked;
    let newCheck = new usersCheck ();
    let child = document.getElementById(id);
    let parent = child.parentNode;
    if (check == true && countCheck == 0){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        parent.style.backgroundColor = "rgba(0,0,0,0.05)";
        arrayUsersCheck.push(newCheck);
        countCheck = countCheck + 1;
    }else if(check == true && countCheck >= 1){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        arrayUsersCheck.push(newCheck);
        let i = 0;
        for(i in arrayUsersCheck){
            let checkId = arrayUsersCheck[i].checkId;
            let check = document.getElementById(checkId);
            let parentCheck = check.parentNode;
            parentCheck.style.backgroundColor = "rgba(6,131,249,0.20)";
        }
        countCheck = countCheck + 1;
        let countSelection = document.getElementById("countSelection");
        countSelection.innerText = `${countCheck} seleccionados`;
        countSelection.style.display = "block";
    }else if (check == false && countCheck == 1){
        parent.style.backgroundColor = "#FFFFFF";
        let i = 0;
        for(i in arrayUsersCheck){
            let checkId = arrayUsersCheck[i].checkId;
            if(checkId == id){
                arrayUsersCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
    }else if (check == false && countCheck == 2){
        parent.style.backgroundColor = "#FFFFFF";
        let i = 0;
        for (i in arrayUsersCheck){
            let checkId = arrayUsersCheck[i].checkId;
            if(checkId != id){
                let check = document.getElementById(checkId);
                let parentCheck = check.parentNode;
                parentCheck.style.backgroundColor = "rgba(0,0,0,0.05)";
            }
        }
        for(i in arrayUsersCheck){
            let checkId = arrayUsersCheck[i].checkId;
            if(checkId == id){
                arrayUsersCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        countSelection.style.display = "none";
    }else if (check == false && countCheck > 2){
        parent.style.backgroundColor = "#FFFFFF";
        let i = 0;
        for(i in arrayUsersCheck){
            let checkId = arrayUsersCheck[i].checkId;
            if(checkId == id){
                arrayUsersCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        countSelection.innerText = `${countCheck} seleccionados`;
        countSelection.style.display = "block";
    }
}

function indexOfArrayId(name, value){
    for (let i = 0;i < name.length;i++){
        let valueArray = name[i].id;
        if (valueArray == value){
            return i;
        }
    }
}

/*Clases*/
class usersCheck{
    constructor(id,checkId){
        this.id = id,
        this.checkId = checkId
    }
}