/*Definition variables*/
var buttonSearchContact = document.getElementById("buttonSearchContact");
var buttonAddContact = document.getElementById("buttonAddContact");
var checkClose = document.getElementById("checkClose");
var checkCloseEdit = document.getElementById("checkCloseEdit");
var saveChannel = document.getElementById("saveChannel");
var saveChannelEdit = document.getElementById("saveChannelEdit");
var saveContact = document.getElementById("saveContact");
var inputSearchContact = document.getElementById("inputSearchContact");
var saveContactEdit = document.getElementById("saveContactEdit");
var cancelDelete = document.getElementById("cancelDelete");
var acceptDelete = document.getElementById("acceptDelete");
var deleteContactsSelected = document.getElementById("deleteContactsSelected");
var arrayRegions = new Array();
var arrayCountries = new Array();
var arrayCities = new Array();
var arrayCompany = new Array();
var arrayContacts = new Array();
var arrayContactsCheck = new Array();
var countCheck = 0;
var continuesEdit = true;
/*Add Event Listener*/
document.addEventListener("click",(event)=>{
    let className = event.target.className;
    let id = event.target.id;
    if(className == "fas fa-caret-down icon"){
        let searchSpecification = document.getElementById("searchSpecification");
        searchSpecification.checked = true;
    }else if(className == "fas fa-sort-alpha-down asc"){
        setCheckAsc(event);
    }else if(className == "fas fa-sort-alpha-down-alt desc"){
        setCheckDesc(event);
    }else if(className == "inputName"){
        resetSpanValues(event);
        if(id == "regionsName" || id == "regionsNameEdit"){
            removeAttribute(id);
        }else if(id == "countryName" || id == "countryNameEdit"){
            removeAttribute(id);
        }else if(id == "nameChannel"){
            let accountUser = document.getElementById("inputAccountUser");
            accountUser.removeAttribute("readonly");
            accountUser.style.backgroundColor = "#FFFFFF";
        }else if(id == "inputAccountUser"){
            let preference = document.getElementById("preference");
            preference.removeAttribute("disabled");
            preference.style.backgroundColor = "#FFFFFF";
        }else if(id == "preference"){
            let saveChannel = document.getElementById("saveChannel");
            saveChannel.style.color = "#FFFFFF";
            saveChannel.style.backgroundColor = "#1D72C2";
            saveChannel.style.borderColor = "#1D72C2";
            saveChannel.style.cursor = "pointer";
        }else if(id == "nameChannelEdit"){
            let accountUser = document.getElementById("inputAccountUserEdit");
            accountUser.removeAttribute("readonly");
            accountUser.style.backgroundColor = "#FFFFFF";
        }else if(id == "inputAccountUserEdit"){
            let preference = document.getElementById("preferenceEdit");
            preference.removeAttribute("disabled");
            preference.style.backgroundColor = "#FFFFFF";
        }else if(id == "preferenceEdit"){
            let saveChannel = document.getElementById("saveChannelEdit");
            saveChannel.style.color = "#FFFFFF";
            saveChannel.style.backgroundColor = "#1D72C2";
            saveChannel.style.borderColor = "#1D72C2";
            saveChannel.style.cursor = "pointer";
        }
    }else if(className == "check"){
        selectionContact(event);
    }else if(className == "fas fa-pen edit"){
        localStorage.setItem("contactId",id);
        let popupEditContact = document.getElementById("popupEditContact");
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        queryChannelsByContact(id);
        let index = indexOfArrayId(arrayContacts,id);
        editPreviousValuesContact(index);
        popupEditContact.checked = true;
    }else if(className == "channel edit"){
        sendEditChannelData(id);
    }else if (className == "channel delete"){
        sendDeleteChannelData(id);
    }else if (className == "fas fa-trash delete"){
        localStorage.setItem("contactId",id);
        let popupDeleteContact = document.getElementById("popupDeleteContact");
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        popupDeleteContact.checked = true;
    }
});
buttonSearchContact.addEventListener("click",()=>{
    let searchSpecification = document.getElementById("searchSpecification");
    searchSpecification.checked = false;
    queryContacts();
    document.getElementById("fstName").value = "";
    document.getElementById("lstName").value = "";
    document.getElementById("ocupation").value = "";
    document.getElementById("country").value = "na";
    document.getElementById("organization").value = "na";
    document.getElementById("interest").value = "na";
});
inputSearchContact.addEventListener("click",()=>{
    let searchSpecification = document.getElementById("searchSpecification");
    searchSpecification.checked = true;
});
buttonAddContact.addEventListener("click",()=>{
    let popupSaveContact = document.getElementById("popupSaveContact");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    popupSaveContact.checked = true;
});
checkClose.addEventListener("click",()=>{
    let popupSaveContact = document.getElementById("popupSaveContact");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("inputName").value = "";
    document.getElementById("inpuLastName").value = "";
    document.getElementById("inputOcupation").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputCompany").value = "na";
    document.getElementById("inputInterest").value = "0";
    document.getElementById("regionsName").value = "na";
    document.getElementById("countryName").value = "na";
    document.getElementById("cityName").value = "na";
    document.getElementById("inputAddress").value = "";
    document.getElementById("nameChannel").value = "na";
    document.getElementById("inputAccountUser").value = "";
    document.getElementById("preference").value = "na";
    popupSaveContact.checked = false;
});
checkCloseEdit.addEventListener("click",()=>{
    let popupEditContact = document.getElementById("popupEditContact");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("inputNameEdit").value = "";
    document.getElementById("inpuLastNameEdit").value = "";
    document.getElementById("inputOcupationEdit").value = "";
    document.getElementById("inputEmailEdit").value = "";
    document.getElementById("inputCompanyEdit").value = "na";
    document.getElementById("inputInterestEdit").value = "0";
    document.getElementById("regionsNameEdit").value = "na";
    document.getElementById("countryNameEdit").value = "na";
    document.getElementById("cityNameEdit").value = "na";
    document.getElementById("inputAddressEdit").value = "";
    document.getElementById("nameChannelEdit").value = "na";
    document.getElementById("inputAccountUserEdit").value = "";
    document.getElementById("preferenceEdit").value = "na";
    popupEditContact.checked = false;
});
saveChannel.addEventListener("click",()=>{
    createChannels();
});
saveChannelEdit.addEventListener("click",()=>{
    createChannelsEdit();
});
saveContact.addEventListener("click",()=>{
    validationsInputs();
});
saveContactEdit.addEventListener("click",()=>{
    sendEditContactData();
});
cancelDelete.addEventListener("click",()=>{
    let popupDeleteContact = document.getElementById("popupDeleteContact");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    popupDeleteContact.checked = false;
});
acceptDelete.addEventListener("click",()=>{
    sendDeleteContactData();
});
deleteContactsSelected.addEventListener("click",()=>{
    let popupDeleteContact = document.getElementById("popupDeleteContact");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    popupDeleteContact.checked = true;
})
/*Fetchs async functions*/
async function createChannel(authorization,body){
    let url = 'http://localhost:3000/api/channels/create';
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

async function getRegion(authorization){
    let url = 'http://localhost:3000/api/regions/all';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function getCountriesAll(authorization){
    let url = 'http://localhost:3000/api/regions/countries';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function getCompanies(authorization){
    let url = 'http://localhost:3000/api/companies';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function getCountriesByRegion(authorization,regionId){
    let url = `http://localhost:3000/api/regions/country/${regionId}`;
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function getCitiesByCountry(authorization,countryId){
    let url = `http://localhost:3000/api/regions/city/${countryId}`;
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function createContact(authorization,body){
    let url = 'http://localhost:3000/api/contacts/create';
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

async function getContact(authorization){
    let url = 'http://localhost:3000/api/contacts';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function getContactSearch(authorization,body){
    let url = `http://localhost:3000/api/contacts/spec/${body}`;
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function channelsByContact(authorization,contactId){
    let url = `http://localhost:3000/api/channels/${contactId}`;
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function editChannel(authorization,body,id){
    let url = `http://localhost:3000/api/channels/update/${id}`;
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

async function deleteChannel(authorization,id){
    let url = `http://localhost:3000/api/channels/delete/${id}`;
    const resp = await fetch (url,{
        method:'DELETE',
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = resp;
    return data;
}

async function editContact(authorization,body,id){
    let url = `http://localhost:3000/api/contacts/update/${id}`;
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

async function deleteContact(authorization,id){
    let url = `http://localhost:3000/api/contacts/delete/${id}`;
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
let authorizationRegion = sessionStorage.getItem("authorization");
let getRegionsAll = getRegion(authorizationRegion);
getRegionsAll.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        setOptionsRegions(data);
        setOptionsRegionsEdit(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let spanRegions = document.getElementById("spanRegions");
    spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
    spanRegions.style.display = "block";
})

let getCompaniesAll = getCompanies(authorizationRegion);
getCompaniesAll.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        setOptionsCompanies(data);
        setOptionsCompaniesQuery(data);
        setOptionsCompaniesEdit(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let spanRegions = document.getElementById("spanCompany");
    spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
    spanRegions.style.display = "block";
})

let getCountryAll = getCountriesAll(authorizationRegion);
getCountryAll.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        setOptionsCountries(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    console.log(code+":"+message);
})

let getContactsAll = getContact(authorizationRegion);
getContactsAll.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        getContactsData(data,"new");
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let containerSpanCompanies = document.getElementById("containerSpanContacts");
    let spanRegions = document.getElementById("spanContacts");
    spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
    containerSpanCompanies.style.display = "block";
})
/*Functions*/

function setCheckAsc(event){
    let parent = event.target.parentElement;
    let child = parent.querySelector("input");
    let indeterminate = child.indeterminate;
    if(indeterminate == false){
        child.indeterminate = true;
        orderContactAsc(child,"Asc");
    }else{
        child.indeterminate = false;
        child.checked = true;
        orderContactAsc(child,"Desc");
    }
}

function setCheckDesc(event){
    let parent = event.target.parentElement;
    let child = parent.querySelector("input");
    child.checked = false;
}

function selectionContact(event){
    let id = event.target.id;
    let check = event.target.checked;
    let newCheck = new contactsCheck ();
    let child = document.getElementById(id);
    let parent = child.parentNode;
    if (check == true && countCheck == 0){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        parent.style.backgroundColor = "rgba(0,0,0,0.05)";
        displayDeleteEdit(parent);
        arrayContactsCheck.push(newCheck);
        countCheck = countCheck + 1;
    }else if(check == true && countCheck >= 1){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        arrayContactsCheck.push(newCheck);
        let i = 0;
        for(i in arrayContactsCheck){
            let checkId = arrayContactsCheck[i].checkId;
            let check = document.getElementById(checkId);
            let parentCheck = check.parentNode;
            parentCheck.style.backgroundColor = "rgba(6,131,249,0.20)";
            displayWait(parentCheck);
        }
        countCheck = countCheck + 1;
        let countSelection = document.getElementById("countSelection");
        let deleteSelection = document.getElementById("deleteSelection");
        countSelection.innerText = `${countCheck} seleccionados`;
        countSelection.style.display = "block";
        deleteSelection.style.display = "flex";
    }else if (check == false && countCheck == 1){
        parent.style.backgroundColor = "#FFFFFF";
        displayWait(parent);
        let i = 0;
        for(i in arrayContactsCheck){
            let checkId = arrayContactsCheck[i].checkId;
            if(checkId == id){
                arrayContactsCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
    }else if (check == false && countCheck == 2){
        parent.style.backgroundColor = "#FFFFFF";
        displayWait(parent);
        let i = 0;
        for (i in arrayContactsCheck){
            let checkId = arrayContactsCheck[i].checkId;
            if(checkId != id){
                let check = document.getElementById(checkId);
                let parentCheck = check.parentNode;
                parentCheck.style.backgroundColor = "rgba(0,0,0,0.05)";
                displayDeleteEdit(parentCheck);
            }
        }
        for(i in arrayContactsCheck){
            let checkId = arrayContactsCheck[i].checkId;
            if(checkId == id){
                arrayContactsCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        let deleteSelection = document.getElementById("deleteSelection");
        countSelection.style.display = "none";
        deleteSelection.style.display = "none";
    }else if (check == false && countCheck > 2){
        parent.style.backgroundColor = "#FFFFFF";
        displayWait(parent);
        let i = 0;
        for(i in arrayContactsCheck){
            let checkId = arrayContactsCheck[i].checkId;
            if(checkId == id){
                arrayContactsCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        let deleteSelection = document.getElementById("deleteSelection");
        countSelection.innerText = `${countCheck} seleccionados`;
        countSelection.style.display = "block";
        deleteSelection.style.display = "flex";
    }
}

function createChannels(){
    let authorization = sessionStorage.getItem("authorization");
    let valueNameChannel = document.getElementById("nameChannel").value;
    let valueInputAccountUser = document.getElementById("inputAccountUser").value;
    let valuePreference = document.getElementById("preference").value;
    let body = new Object();
    body.name = valueNameChannel;
    body.accountUser = valueInputAccountUser;
    body.preference = valuePreference;
    let createChannelReq = createChannel(authorization,body);
    createChannelReq.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            let containerChannels = document.getElementById("containerOtherChannels");
            let divOtherChannel = document.createElement("div");
            divOtherChannel.className = "otherChannels";
            divOtherChannel.id = data.id;
            divOtherChannel.innerHTML= `<div class="containerInputName">
            <label for="nameChannel" class="labelName">Canal de contacto</label>
            <input type="text" class="inputName" id="nameChannel_${data.id}"readonly>
            </div>
            <div class="containerInputName">
                <label for="inputAccountUser" class="labelName">Cuenta de usuario</label>
                <input type="text" class="inputName" id="inputAccountUser_${data.id}" readonly>               
            </div>
            <div class="containerInputName">
                <label for="preference" class="labelName">Preferencias</label>
                <input type="text" class="inputName" id="preference_${data.id}"readonly>
            </div>`;
            containerChannels.append(divOtherChannel);
            document.getElementById(`nameChannel_${data.id}`).value = valueNameChannel;
            document.getElementById(`inputAccountUser_${data.id}`).value = valueInputAccountUser;
            document.getElementById(`preference_${data.id}`).value = valuePreference;
            disabledButton();
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function createChannelsEdit(){
    let authorization = sessionStorage.getItem("authorization");
    let valueNameChannel = document.getElementById("nameChannelEdit").value;
    let valueInputAccountUser = document.getElementById("inputAccountUserEdit").value;
    let valuePreference = document.getElementById("preferenceEdit").value;
    let body = new Object();
    body.name = valueNameChannel;
    body.accountUser = valueInputAccountUser;
    body.preference = valuePreference;
    let createChannelReq = createChannel(authorization,body);
    createChannelReq.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            let containerChannels = document.getElementById("containerOtherChannelsEdit");
            let divOtherChannel = document.createElement("div");
            divOtherChannel.className = "otherChannels";
            divOtherChannel.id = data.id;
            divOtherChannel.innerHTML= `<div class="containerInputName">
            <label for="nameChannel" class="labelName">Canal de contacto</label>
            <input type="text" class="inputName" id="nameChannel_${data.id}"readonly>
            </div>
            <div class="containerInputName">
                <label for="inputAccountUser" class="labelName">Cuenta de usuario</label>
                <input type="text" class="inputName" id="inputAccountUser_${data.id}" readonly>               
            </div>
            <div class="containerInputName">
                <label for="preference" class="labelName">Preferencias</label>
                <input type="text" class="inputName" id="preference_${data.id}"readonly>
            </div>`;
            containerChannels.append(divOtherChannel);
            document.getElementById(`nameChannel_${data.id}`).value = valueNameChannel;
            document.getElementById(`inputAccountUser_${data.id}`).value = valueInputAccountUser;
            document.getElementById(`preference_${data.id}`).value = valuePreference;
            disabledButtonEdit();
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function disabledButton(){
    let accountUser = document.getElementById("inputAccountUser");
    let preference = document.getElementById("preference");
    let saveChannel = document.getElementById("saveChannel");
    let nameChannel = document.getElementById("nameChannel");
    accountUser.setAttribute("readonly","");
    accountUser.style.backgroundColor = "#C6CACC";
    preference.setAttribute("disabled","");
    preference.style.backgroundColor = "#C6CACC";
    saveChannel.style.color = "#C6CACC";
    saveChannel.style.backgroundColor = "#FFFFFF";
    saveChannel.style.borderColor = "#C6CACC";
    saveChannel.style.cursor = "default";
    accountUser.value = "";
    preference.value = "na"
    nameChannel.value = "na"
}

function disabledButtonEdit(){
    let accountUser = document.getElementById("inputAccountUserEdit");
    let preference = document.getElementById("preferenceEdit");
    let saveChannel = document.getElementById("saveChannelEdit");
    let nameChannel = document.getElementById("nameChannelEdit");
    accountUser.setAttribute("readonly","");
    accountUser.style.backgroundColor = "#C6CACC";
    preference.setAttribute("disabled","");
    preference.style.backgroundColor = "#C6CACC";
    saveChannel.style.color = "#C6CACC";
    saveChannel.style.backgroundColor = "#FFFFFF";
    saveChannel.style.borderColor = "#C6CACC";
    saveChannel.style.cursor = "default";
    accountUser.value = "";
    preference.value = "na"
    nameChannel.value = "na"
}

function validationsInputs(){
    let inputName = document.getElementById("inputName").value;
    let inpuLastName = document.getElementById("inpuLastName").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputOcupation = document.getElementById("inputOcupation").value;
    let inputCompany = document.getElementById("inputCompany").value;
    let spanName = document.getElementById("spanName");
    let spanLastName = document.getElementById("spanLastName");
    let spanEmail = document.getElementById("spanEmail");
    let spanOcupation = document.getElementById("spanOcupation");
    let spanCompany = document.getElementById("spanCompany");
    let continues = true;
    let continuesEmail = true;
    if(inputName == null || inputName == "" || inputName == undefined){
        spanName.innerText = "Este campo es obligatorio";
        spanName.style.display = "block";
        continues = false;
        if(inpuLastName == null || inpuLastName == "" || inpuLastName == undefined){
            spanLastName.innerText = "Este campo es obligatorio";
            spanLastName.style.display = "block";
            continues = false;
            if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
                spanEmail.innerText = "Este campo es obligatorio";
                spanEmail.style.display = "block";
                continues = false;
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }else{
                continuesEmail = validateInputsDataEmail(inputEmail);
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }
        }else{
            if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
                spanEmail.innerText = "Este campo es obligatorio";
                spanEmail.style.display = "block";
                continues = false;
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }else{
                continuesEmail = validateInputsDataEmail(inputEmail);
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }
        }
    }else{
        if(inpuLastName == null || inpuLastName == "" || inpuLastName == undefined){
            spanLastName.innerText = "Este campo es obligatorio";
            spanLastName.style.display = "block";
            continues = false;
            if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
                spanEmail.innerText = "Este campo es obligatorio";
                spanEmail.style.display = "block";
                continues = false;
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }else{
                continuesEmail = validateInputsDataEmail(inputEmail);
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }
        }else{
            if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
                spanEmail.innerText = "Este campo es obligatorio";
                spanEmail.style.display = "block";
                continues = false;
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }else{
                continuesEmail = validateInputsDataEmail(inputEmail);
                if(inputOcupation == null || inputOcupation == "" || inputOcupation == undefined){
                    spanOcupation.innerText = "Este campo es obligatorio";
                    spanOcupation.style.display = "block";
                    continues = false;
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }else{
                    if(inputCompany == "na"){
                        spanCompany.innerText = "Este campo es obligatorio";
                        spanCompany.style.display = "block";
                        continues = false;
                    }
                }
            }
        }
    }
    if(continues == true && continuesEdit == true && continuesEmail == true){
        createNewContact();
    }else{
        alert("Valide los datos ingresados");
    }   
}

function validateInputsDataEmail(inputEmail){
    let spanEmail = document.getElementById("spanEmail");
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-zA-Z0-9.]/;
    let match = inputEmail.match(validEmail);
    if(match == null || match == "" || match == undefined){
        spanEmail.innerText = "Error en datos ingresados";
        spanEmail.style.display = "block";
        return false;
    }else{
        return true
    }
}

function resetSpanValues(event){
    let grandParent = event.target.parentElement.parentElement;
    let spans = grandParent.querySelectorAll(".validationInput");
    let i = 0;
    for(i;i < spans.length; i++){
        spans[i].style.display = "none";
        spans[i].innerText = "";
    }
}

function setOptionsRegions(data){
    let regionsName = document.getElementById("regionsName");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id;
        option.innerText = name;
        regionsName.appendChild(option);
        let newRegion = new regions(id,name);
        arrayRegions.push(newRegion);
    }
}

function setOptionsRegionsEdit(data){
    let regionsNameEdit = document.getElementById("regionsNameEdit");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id;
        option.innerText = name;
        regionsNameEdit.appendChild(option);
    }
}

function setOptionsCompanies(data){
    let inputCompany = document.getElementById("inputCompany");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].nameCompany;
        option.value = id;
        option.id = id;
        option.innerText = name;
        inputCompany.appendChild(option);
        let newCompany = new companies(id,name);
        arrayCompany.push(newCompany);
    }
}

function setOptionsCompaniesQuery(data){
    let inputCompany = document.getElementById("organization");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].nameCompany;
        option.value = id;
        option.id = id;
        option.innerText = name;
        inputCompany.appendChild(option);
    }
}

function setOptionsCompanies(data){
    let inputCompany = document.getElementById("inputCompany");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].nameCompany;
        option.value = id;
        option.id = id;
        option.innerText = name;
        inputCompany.appendChild(option);
    }
}

function setOptionsCompaniesEdit(data){
    let inputCompany = document.getElementById("inputCompanyEdit");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].nameCompany;
        option.value = id;
        option.id = id;
        option.innerText = name;
        inputCompany.appendChild(option);
    }
}

function setOptionsCountries(data){
    let inputCountries = document.getElementById("country");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id;
        option.innerText = name;
        inputCountries.appendChild(option);
    }
}

function removeAttribute(id){
    if(id == "regionsName"){
        let valueRegionsName = document.getElementById("regionsName").value;
        if(valueRegionsName != "na"){
            let countryName = document.getElementById("countryName");
            countryName.removeAttribute("disabled");
            countryName.style.backgroundColor = "#FFFFFF";
            getCountries(valueRegionsName);
        }
    }else if(id == "countryName"){
        let valueCountryName = document.getElementById("countryName").value;
        if(valueCountryName != "na"){
            let cityName = document.getElementById("cityName");
            cityName.removeAttribute("disabled");
            cityName.style.backgroundColor = "#FFFFFF";
            getCities(valueCountryName);
        }
    }else if(id == "regionsNameEdit"){
        let valueRegionsName = document.getElementById("regionsNameEdit").value;
        if(valueRegionsName != "na"){
            let countryName = document.getElementById("countryNameEdit");
            countryName.removeAttribute("disabled");
            countryName.style.backgroundColor = "#FFFFFF";
            getCountriesEdit(valueRegionsName);
        }
    }else if(id == "countryNameEdit"){
        let valueCountryName = document.getElementById("countryNameEdit").value;
        if(valueCountryName != "na"){
            let cityName = document.getElementById("cityNameEdit");
            cityName.removeAttribute("disabled");
            cityName.style.backgroundColor = "#FFFFFF";
            getCitiesEdit(valueCountryName);
        }
    }
}

function getCountries(valueRegion){
    let authorization = sessionStorage.getItem("authorization");
    let getCountriesRegion = getCountriesByRegion(authorization,valueRegion);
    getCountriesRegion.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            setOptionsCountry(data);
            // continuesEdit = true;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCountries");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
        continuesEdit = false;
    })
}

function getCountriesEdit(valueRegion){
    let authorization = sessionStorage.getItem("authorization");
    let getCountriesRegion = getCountriesByRegion(authorization,valueRegion);
    getCountriesRegion.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            setOptionsCountryEdit(data);
            // continuesEdit = true;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCountries");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
        continuesEdit = false;
    })
}

function getCities(valueCountry){
    let authorization = sessionStorage.getItem("authorization");
    let getCitiesRegion = getCitiesByCountry(authorization,valueCountry);
    getCitiesRegion.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            setOptionsCity(data);
            // continuesEdit = true;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCities");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
        continuesEdit = false;
    })
}

function getCitiesEdit(valueCountry){
    let authorization = sessionStorage.getItem("authorization");
    let getCitiesRegion = getCitiesByCountry(authorization,valueCountry);
    getCitiesRegion.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            setOptionsCityEdit(data);
            // continuesEdit = true;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCities");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
        continuesEdit = false;
    })
}

function setOptionsCountry(data){
    let countryName = document.getElementById("countryName");
    removeNode(countryName,"paramOption");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id
        option.className = "paramOption";
        option.innerText = name
        countryName.appendChild(option);
        let newCountry = new countries(id,name);
        arrayCountries.push(newCountry);
    }
}

function setOptionsCountryEdit(data){
    let countryName = document.getElementById("countryNameEdit");
    removeNode(countryName,"paramOption");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id
        option.className = "paramOption";
        option.innerText = name
        countryName.appendChild(option);
    }
}

function setOptionsCity(data){
    let cityName = document.getElementById("cityName");
    removeNode(cityName,"paramOptionCity");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id
        option.className = "paramOptionCity";
        option.innerText = name
        cityName.appendChild(option);
        let newCity = new cities(id,name);
        arrayCities.push(newCity);
    }
}

function setOptionsCityEdit(data){
    let cityName = document.getElementById("cityNameEdit");
    removeNode(cityName,"paramOptionCity");
    let i = 0;
    for(i; i < data.length; i++){
        let option = document.createElement("option");
        let id = data[i].id;
        let name = data[i].name;
        option.value = id;
        option.id = id
        option.className = "paramOptionCity";
        option.innerText = name
        cityName.appendChild(option);
    }
}

function createNewContact(){
    let authorization = sessionStorage.getItem("authorization");
    let valueName = document.getElementById("inputName").value;
    let valueLastName = document.getElementById("inpuLastName").value;
    let valueEmail = document.getElementById("inputEmail").value;
    let valueOcupation = document.getElementById("inputOcupation").value;
    let valueCompany = document.getElementById("inputCompany").value;
    let valueRegionsName = document.getElementById("regionsName").value;
    let valueAddress = document.getElementById("inputAddress").value;
    let valueInterest = document.getElementById("inputInterest").value;
    let body = new Object();
    body.fstname = valueName;
    body.lstName = valueLastName;
    body.email = valueEmail;
    body.ocupation = valueOcupation;
    body.companyId = valueCompany;
    body.address = valueAddress;
    body.interest = valueInterest;
    if(valueRegionsName != "na"){
        let valueCountryName = document.getElementById("countryName").value;
        let valueCityName = document.getElementById("cityName").value;
        body.regionId = valueRegionsName;
        body.countryId = valueCountryName;
        body.cityId = valueCityName;
    }else{
        body.regionId = undefined;
    }
    let valueChannels = document.getElementById("containerOtherChannels");
    if(valueChannels.hasChildNodes() == true){
        let newArrayChannel = new Array();
        let childs = valueChannels.querySelectorAll(".otherChannels");
        let i = 0;
        for (i; i < childs.length; i++){
            let newObjectChannel = new Object();
            let idChannels = childs[i].id;
            newObjectChannel.channelId = idChannels;
            newArrayChannel.push(newObjectChannel);
        }
        body.channels = newArrayChannel;
    }else{
        body.channels = undefined;
    }
    let createContacts = createContact(authorization,body);
    createContacts.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            location.reload();
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function getContactsData(data,type){
    let divContainer = document.getElementById("contactsData");
    let i = 0;
    for(i; i < data.length; i++){
        let id = data[i].id;
        let div = document.createElement("div");
        div.className = "contactsData";
        div.id = id;
        let fisrtName = data[i].fisrtName;
        let lastName = data[i].lastName;
        let email = data[i].email;
        let region = data[i].nameRegion;
        let country = data[i].nameCountry;
        let interest = data[i].interest;
        let ocupation = data[i].ocupation;
        let company = data[i].nameCompany;
        div.innerHTML = `<input type="checkbox" name="check" class="check" id="check_${id}">
        <div class="inputNameContact">    
            <span class="titles">${fisrtName} ${lastName}</span>
            <span class="subTitles">${email}</span>
        </div>
        <div class="inputNameRegion">
            <span class="titles">${country}</span>
            <span class="subTitles">${region}</span>
        </div>
        <span class="ocupation">${company}</span>
        <span class="ocupation">${ocupation}</span>
        <div class="ocupation">
            <span>${interest}%</span>
            <div id="indicator_${id}"></div>
        </div>
        <div class="actions">
            <div class="wait"></div>
            <div class="deleteEdit" id="${id}">
                <i class="fas fa-trash delete" id="${id}"></i>
                <i class="fas fa-pen edit" id="${id}"></i>
            </div>
        </div>`;
        divContainer.appendChild(div);
        if (type == "new"){
            arrayContacts.push(data[i]);
        }
        createIndicatorInterest(id,interest);
    }
}

function createIndicatorInterest(id,interest){
    let indicator = document.querySelector(`#indicator_${id}`);
    indicator.style.width = "130px";
    indicator.style.height = "10px";
    indicator.style.backgroundColor = "#CCCCCC";
    indicator.style.borderRadius = "4px";
    let div = document.createElement("div");
    div.style.width = "130px";
    div.style.height = "10px";
    div.style.borderRadius = "4px";
    div.style.backgroundColor = "#CCCCCC";
    if (interest == 25){
        div.style.width = "32.5px";
        div.style.backgroundColor = "#1CC1F5";
    }else if(interest == 50){
        div.style.width = "65px";
        div.style.backgroundColor = "#FFC700";
    }else if(interest == 75){
        div.style.width = "97.5px";
        div.style.backgroundColor = "#FF6F00";
    }else if(interest == 100){
        div.style.width = "130px";
        div.style.backgroundColor = "#DE0028";
    }
    indicator.appendChild(div);
}

function displayDeleteEdit(parent){
    let actions = parent.querySelector(".actions");
    let wait = actions.querySelector(".wait");
    let deleteEdit = actions.querySelector(".deleteEdit");
    wait.style.display = "none";
    deleteEdit.style.display = "flex";
}

function displayWait(parent){
    let actions = parent.querySelector(".actions");
    let wait = actions.querySelector(".wait");
    let deleteEdit = actions.querySelector(".deleteEdit");
    wait.style.display = "block";
    deleteEdit.style.display = "none";
}

function queryContacts(){
    let valueFstName = document.getElementById("fstName").value;
    let valueLstName = document.getElementById("lstName").value;
    let valueOcupation = document.getElementById("ocupation").value;
    let valueCountry = document.getElementById("country").value;
    let valueOrganization = document.getElementById("organization").value;
    let valueInterest = document.getElementById("interest").value;
    let queryObject = new Object();
    if(valueFstName != "" && valueFstName != null && valueFstName != undefined){
        queryObject.fstName = valueFstName;
        if(valueLstName != "" && valueLstName != null && valueLstName != undefined){
            queryObject.lstName = valueLstName;
            if(valueOcupation != "" && valueOcupation != null && valueOcupation != undefined){
                queryObject.ocupation = valueOcupation;
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }else{
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }
        }else{
            if(valueOcupation != "" && valueOcupation != null && valueOcupation != undefined){
                queryObject.ocupation = valueOcupation;
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }else{
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }
        }
    }else{
        if(valueLstName != "" && valueLstName != null && valueLstName != undefined){
            queryObject.lstName = valueLstName;
            if(valueOcupation != "" && valueOcupation != null && valueOcupation != undefined){
                queryObject.ocupation = valueOcupation;
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }else{
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }
        }else{
            if(valueOcupation != "" && valueOcupation != null && valueOcupation != undefined){
                queryObject.ocupation = valueOcupation;
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }else{
                if(valueCountry != "na"){
                    queryObject.countryId = valueCountry;
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }else{
                    if(valueOrganization != "na"){
                        queryObject.companyId = valueOrganization;
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }else{
                        if(valueInterest != "na"){
                            queryObject.interest = valueInterest;
                        }
                    }
                }
            }
        }
    }
    querySearchSpecification(queryObject);
}

function querySearchSpecification(queryObject){
    let authorization = sessionStorage.getItem("authorization");
    let body = JSON.stringify(queryObject);
    let getContactSearchSpec = getContactSearch(authorization,body);
    getContactSearchSpec.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            let parent = document.getElementById("contactsData");
            removeNode(parent,"contactsData");
            addContactSearchSpec(data);
            let count = arrayContactsCheck.length;
            arrayContactsCheck.splice(0,count);
            countCheck = 0;
            let countSelection = document.getElementById("countSelection");
            let deleteSelection = document.getElementById("deleteSelection");
            countSelection.style.display = "none";
            deleteSelection.style.display = "none";
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function addContactSearchSpec(data){
    let divContainer = document.getElementById("contactsData");
    let i = 0;
    for(i; i < data.length; i++){
        let id = data[i].id;
        let div = document.createElement("div");
        div.className = "contactsData";
        div.id = id;
        let fisrtName = data[i].fstName;
        let lastName = data[i].lstName;
        let email = data[i].email;
        let region = data[i].region.name;
        let country = data[i].country.name;
        let interest = data[i].interest;
        let ocupation = data[i].ocupation;
        let company = data[i].company.name;
        div.innerHTML = `<input type="checkbox" name="check" class="check" id="check_${id}">
        <div class="inputNameContact">    
            <span class="titles">${fisrtName} ${lastName}</span>
            <span class="subTitles">${email}</span>
        </div>
        <div class="inputNameRegion">
            <span class="titles">${country}</span>
            <span class="subTitles">${region}</span>
        </div>
        <span class="ocupation">${company}</span>
        <span class="ocupation">${ocupation}</span>
        <div class="ocupation">
            <span>${interest}%</span>
            <div id="indicator_${id}"></div>
        </div>
        <div class="actions">
            <div class="wait"></div>
            <div class="deleteEdit" id="${id}">
                <i class="fas fa-trash delete" id="${id}"></i>
                <i class="fas fa-pen edit" id="${id}"></i>
            </div>
        </div>`;
        divContainer.appendChild(div);
        createIndicatorInterest(id,interest);
    }
}

function orderContactAsc(child,type){
    let parent = document.getElementById("contactsData");
    removeNode(parent,"contactsData");
    let id = child.id;
    let array = arrayContacts;
    if(id == "ascDecCont"){
        array.sort(dynamicSort("fisrtName",type));
    }else if (id == "ascDecCoun"){
        array.sort(dynamicSort("nameCountry",type));
    }else if (id == "ascDecCom"){
        array.sort(dynamicSort("nameCompany",type));
    }else if (id == "ascDecOcu"){
        array.sort(dynamicSort("ocupation",type));
    }else if (id == "ascDecInt"){
        array.sort(dynamicSort("interest",type));
    }
    getContactsData(array,"sort");
}

function dynamicSort(property,type) {
    let sortOrder = 0;
    if(type == "Asc"){
        sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
    }else{
        sortOrder = -1;
        if(property[0] === "-") {
            sortOrder = 1;
            property = property.substr(1);
        }
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function queryChannelsByContact(id){
    let authorization = sessionStorage.getItem("authorization");
    let getChannelsByContact = channelsByContact(authorization,id);
    getChannelsByContact.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined && code != "404"){
            throw data;
        }else if(code != "404"){
            setChannelsToContact(data);
        }else if(code == "404"){
            let containerChannels = document.getElementById("containerOtherChannelsEdit");
            removeNode(containerChannels,"otherChannels");
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function setChannelsToContact(data){
    let containerChannels = document.getElementById("containerOtherChannelsEdit");
    removeNode(containerChannels,"otherChannels");
    let i = 0;
    for (i in data){
        let divOtherChannel = document.createElement("div");
        divOtherChannel.className = "otherChannels";
        divOtherChannel.id = data[i].id;
        divOtherChannel.innerHTML= `<div class="containerInputName">
        <label for="nameChannel_${data[i].id}" class="labelName">Canal de contacto</label>
        <select name="channel" class="inputNameEdit" id="nameChannel_${data[i].id}">
            <option value="Llamada" id="LlamadaEdit_${data[i].id}">Llamada</option>
            <option value="Mensaje" id="MensajeEdit_${data[i].id}">Mensaje</option>
            <option value="Email" id="EmailEdit_${data[i].id}">Email</option>
            <option value="WhatsApp" id="WhatsAppEdit_${data[i].id}">WhatsApp</option>
            <option value="Facebook" id="FacebookEdit_${data[i].id}">Facebook</option>
            <option value="Instagram" id="InstagramEdit_${data[i].id}">Instagram</option>
        </select>
        </div>
        <div class="containerInputName">
            <label for="inputAccountUser" class="labelName">Cuenta de usuario</label>
            <input type="text" class="inputNameEdit" id="inputAccountUser_${data[i].id}">               
        </div>
        <div class="containerInputName">
            <label for="preference_${data[i].id}" class="labelName">Preferencias</label>
            <select name="preference" class="inputNameEdit" id="preference_${data[i].id}">
                <option value="Canal favorito" id="favoriteChannelEdit_${data[i].id}">Canal favorito</option>
                <option value="No molestar" id="dontDisturbEdit_${data[i].id}">No molestar</option>
            </select>
        </div>
        <button class="channel edit" id="${data[i].id}"><i class="fas fa-pen""></i>Editar canal</button>
        <button class="channel delete" id="${data[i].id}"><i class="fas fa-trash"></i>Eliminar canal</button>`;
        containerChannels.append(divOtherChannel);
        document.getElementById(`nameChannel_${data[i].id}`).value = data[i].name;
        document.getElementById(`inputAccountUser_${data[i].id}`).value = data[i].accountUser;
        document.getElementById(`preference_${data[i].id}`).value = data[i].preference;
    }
}

function editPreviousValuesContact(index){
    let idRegion = arrayContacts[index].idRegion
    document.getElementById("inputNameEdit").value = arrayContacts[index].fisrtName;
    document.getElementById("inpuLastNameEdit").value = arrayContacts[index].lastName;
    document.getElementById("inputOcupationEdit").value = arrayContacts[index].ocupation;
    document.getElementById("inputEmailEdit").value = arrayContacts[index].email;
    document.getElementById("inputCompanyEdit").value = arrayContacts[index].idCompany;
    document.getElementById("inputInterestEdit").value = arrayContacts[index].interest;
    document.getElementById("inputAddressEdit").value = arrayContacts[index].address;
    if(idRegion == null || idRegion == "" || idRegion == undefined){
        document.getElementById("regionsNameEdit").value = "na";
        document.getElementById("countryNameEdit").innerHTML = '<option value="na" id="defaultCountryEdit" hidden>Seleccionar país</option>';
        document.getElementById("cityNameEdit").innerHTML = '<option value="na" id="defaultCityEdit" hidden>Seleccionar ciudad</option>';
    }else{
        document.getElementById("regionsNameEdit").value = arrayContacts[index].idRegion;
        document.getElementById("countryNameEdit").innerHTML = `<option value="${arrayContacts[index].idCountry}" id="${arrayContacts[index].idCountry}">${arrayContacts[index].nameCountry}</option>`;
        document.getElementById("cityNameEdit").innerHTML = `<option value="${arrayContacts[index].idCity}" id="${arrayContacts[index].idCity}">${arrayContacts[index].nameCity}</option>`;
    }
}

function sendEditContactData(){
    let authorization = sessionStorage.getItem("authorization");
    let contactId = localStorage.getItem("contactId")
    let valueName = document.getElementById("inputNameEdit").value;
    let valueLastName = document.getElementById("inpuLastNameEdit").value;
    let valueEmail = document.getElementById("inputEmailEdit").value;
    let valueOcupation = document.getElementById("inputOcupationEdit").value;
    let valueCompany = document.getElementById("inputCompanyEdit").value;
    let valueRegionsName = document.getElementById("regionsNameEdit").value;
    let valueAddress = document.getElementById("inputAddressEdit").value;
    let valueInterest = document.getElementById("inputInterestEdit").value;
    let valueCountryName = document.getElementById("countryNameEdit").value;
    let valueCityName = document.getElementById("cityNameEdit").value;
    let body = new Object();
    body.fstname = valueName;
    body.lstName = valueLastName;
    body.email = valueEmail;
    body.ocupation = valueOcupation;
    body.companyId = valueCompany;
    body.address = valueAddress;
    body.interest = valueInterest;
    if(valueRegionsName != "na"){
        body.regionId = valueRegionsName;
        body.countryId = valueCountryName;
        body.cityId = valueCityName;
    }else{
        body.regionId = undefined;
    }
    let valueChannels = document.getElementById("containerOtherChannelsEdit");
    if(valueChannels.hasChildNodes() == true){
        let newArrayChannel = new Array();
        let childs = valueChannels.querySelectorAll(".otherChannels");
        let i = 0;
        for (i; i < childs.length; i++){
            let newObjectChannel = new Object();
            let idChannels = childs[i].id;
            newObjectChannel.channelId = idChannels;
            newArrayChannel.push(newObjectChannel);
        }
        body.channels = newArrayChannel;
    }else{
        body.channels = undefined;
    }
    let editContacts = editContact(authorization,body,contactId);
    editContacts.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function sendEditChannelData(id){
    let authorization = sessionStorage.getItem("authorization");
    let valueNameChannel = document.getElementById(`nameChannel_${id}`).value;
    let valueAccountUser = document.getElementById(`inputAccountUser_${id}`).value;
    let valuePreference = document.getElementById(`preference_${id}`).value;
    let body = new Object();
    body.name = valueNameChannel;
    body.accountUser = valueAccountUser;
    body.preference = valuePreference;
    let editChannels = editChannel(authorization,body,id);
    editChannels.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function sendDeleteChannelData(id){
    let authorization = sessionStorage.getItem("authorization");
    let deleteChannels = deleteChannel(authorization,id);
    deleteChannels.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function sendDeleteContactData(){
    let authorization = sessionStorage.getItem("authorization");
    let i = 0;
    let newArrayContact = new Array();
    for(i; i < arrayContactsCheck.length; i++){
        let body = new Object();
        let contactId = arrayContactsCheck[i].id;
        body.id = contactId;
        newArrayContact.push(body);
    }
    let contactId = JSON.stringify(newArrayContact);
    let deleteContactSelect = deleteContact(authorization,contactId);
    deleteContactSelect.then((data)=>{
        let code = data.status;
        if(code == 200){
            location.reload();
        }else{
            throw data;
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        alert("Código: "+code+". Mensaje: "+message);
    })
}

function removeNode(parent,option){
    let childs = parent.querySelectorAll(`.${option}`);
    let i = 0;
    for(i; i < childs.length; i++){
        parent.removeChild(childs[i]);
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

/*classes*/
class regions {
    constructor (id,name){
        this.id = id,
        this.name = name
    }
}

class countries {
    constructor (id,name){
        this.id = id,
        this.name = name
    }
}

class cities {
    constructor (id,name){
        this.id = id,
        this.name = name
    }
}

class companies {
    constructor (id,name){
        this.id = id,
        this.name = name
    }
}

class contactsCheck {
    constructor (id,checkId){
        this.id = id,
        this.checkId = checkId
    }
}