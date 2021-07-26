/*Definition variables*/
var saveCompany = document.getElementById("saveCompany");
var saveEditCompany = document.getElementById("saveEditCompany");
var inputClose = document.getElementById("checkClose");
var inputCloseEdit = document.getElementById("checkCloseEdit");
var buttonAddCompany = document.getElementById("buttonAddCompany");
var arrayRegions = new Array();
var arrayCountries = new Array();
var arrayCities = new Array();
var arrayCompanies = new Array();
var arrayCompaniesCheck = new Array();
var continuesEdit = true;
var countCheck = 0;
/*Add Event Listener*/
saveCompany.addEventListener("click",()=>{
    validationsInputs();
});
saveEditCompany.addEventListener("click",()=>{
    sendEditData();
});
inputClose.addEventListener("click",()=>{
    let popupSaveCompany = document.getElementById("popupSaveCompany");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPhone").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("regionsName").value = "na";
    document.getElementById("countryName").value = "na";
    document.getElementById("cityName").value = "na";
    popupSaveCompany.checked = false;
});
inputCloseEdit.addEventListener("click",()=>{
    let popupEditCompany = document.getElementById("popupEditCompany");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    popupEditCompany.checked = false;
})
buttonAddCompany.addEventListener("click",()=>{
    let popupSaveCompany = document.getElementById("popupSaveCompany");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    popupSaveCompany.checked = true;
});
document.addEventListener("click",(event)=>{
    let className = event.target.className;
    let id = event.target.id;
    if(className == "inputName"){
        resetSpanValues(event);
        if(id == "regionsName" || id == "regionsNameEdit"){
            removeAttribute(id);
        }else if(id == "countryName" || id == "countryNameEdit"){
            removeAttribute(id);
        }
    }else if(className == "edit"){
        editRecordCompany(id);
        let idCompany = event.target.id;
        localStorage.setItem("idCompany",idCompany);
    }else if(className == "delete"){
        deleteRecordCompany(id);
    }else if(className == "check ocupation"){
        selectionCompany(event);
    }
});
/*Fetchs async functions*/
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

async function createCompany(authorization,body){
    let url = 'http://localhost:3000/api/companies/create';
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

async function updateCompany(authorization,body,id){
    let url = `http://localhost:3000/api/companies/update/${id}`;
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

async function deleteCompany(authorization,id){
    let url = `http://localhost:3000/api/companies/delete/${id}`;
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
        getCompaniesData(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let containerSpanCompanies = document.getElementById("containerSpanCompanies");
    let spanRegions = document.getElementById("spanCompanies");
    spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
    containerSpanCompanies.style.display = "block";
})
/*Functions*/
function validationsInputs(){
    let inputName = document.getElementById("inputName").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPhone = document.getElementById("inputPhone").value;
    let inputAddress = document.getElementById("inputAddress").value;
    let spanName = document.getElementById("spanName");
    let spanEmail = document.getElementById("spanEmail");
    let spanPhone = document.getElementById("spanPhone");
    let spanAddress = document.getElementById("spanAddress");
    let continues = true;
    let continuesPhone = true;
    let continuesEmail = true;
    if(inputName == null || inputName == "" || inputName == undefined){
        spanName.innerText = "Este campo es obligatorio";
        spanName.style.display = "block";
        continues = false;
        if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
            spanEmail.innerText = "Este campo es obligatorio";
            spanEmail.style.display = "block";
            continues = false;
            if(inputPhone == null || inputPhone == "" || inputPhone == undefined){
                spanPhone.innerText = "Este campo es obligatorio";
                spanPhone.style.display = "block";
                continues = false;
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }else{
                continuesPhone = validateInputsDataPhone(inputPhone);
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }
        }else{
            continuesEmail = validateInputsDataEmail(inputEmail);
            if(inputPhone == null || inputPhone == "" || inputPhone == undefined){
                spanPhone.innerText = "Este campo es obligatorio";
                spanPhone.style.display = "block";
                continues = false;
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }else{
                continuesPhone = validateInputsDataPhone(inputPhone);
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }
        }
    }else{
        if(inputEmail == null || inputEmail == "" || inputEmail == undefined){
            spanEmail.innerText = "Este campo es obligatorio";
            spanEmail.style.display = "block";
            continues = false;
            if(inputPhone == null || inputPhone == "" || inputPhone == undefined){
                spanPhone.innerText = "Este campo es obligatorio";
                spanPhone.style.display = "block";
                continues = false;
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }else{
                continuesPhone = validateInputsDataPhone(inputPhone);
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }
        }else{
            continuesEmail = validateInputsDataEmail(inputEmail)
            if(inputPhone == null || inputPhone == "" || inputPhone == undefined){
                spanPhone.innerText = "Este campo es obligatorio";
                spanPhone.style.display = "block";
                continues = false;
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }else{
                continuesPhone = validateInputsDataPhone(inputPhone);
                if(inputAddress == null || inputAddress == "" || inputAddress == undefined){
                    spanAddress.innerText = "Este campo es obligatorio";
                    spanAddress.style.display = "block";
                    continues = false;
                }
            }
        }
    }
    if(continues == true && continuesPhone == true && continuesEmail == true){
        createNewCompany();
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

function validateInputsDataPhone(inputPhone){
    let spanPhone = document.getElementById("spanPhone");
    let validPhone = /^[0-9]/;
    let match = inputPhone.match(validPhone);
    if(match == null || match == "" || match == undefined){
        spanPhone.innerText = "Error en datos ingresados";
        spanPhone.style.display = "block";
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
        option.id = id
        option.innerText = name
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
        option.id = id
        option.innerText = name
        regionsNameEdit.appendChild(option);
    }
}

function getCompaniesData(data){
    let divContainer = document.getElementById("companiesData");
    let i = 0;
    for(i; i < data.length; i++){
        let div = document.createElement("div");
        div.className = "companiesData";
        let id = data[i].id;
        let name = data[i].nameCompany;
        let email = data[i].email;
        let phone = data[i].phone;
        let region = data[i].nameRegion;
        let country = data[i].nameCountry;
        let city = data[i].nameCity;
        let address = data[i].address;
        div.innerHTML = `<input type="checkbox" name="check" class="check ocupation" id="check_${id}">
        <span class="titles ocupation">${name}</span>
        <span class="titles ocupation">${email}</span>
        <span class="titles ocupation phone">${phone}</span>
        <span class="titles ocupation">${region}</span>
        <span class="titles ocupation">${country}</span>
        <span class="titles ocupation">${city}</span>
        <span class="titles ocupation">${address}</span>
        <div class="actions ocupation">
            <span class="edit" id="${id}">Editar</span>
            <span class="delete" id="${id}">Eliminar</span>
        </div>`;
        divContainer.appendChild(div);
        arrayCompanies.push(data[i]);
    }
}

function removeAttribute(id){
    if(id == "regionsName"){
        let valueRegionsName = document.getElementById("regionsName").value;
        if(valueRegionsName != "na"){
            let countryName = document.getElementById("countryName");
            countryName.removeAttribute("disabled");
            getCountries(valueRegionsName);
        }
    }else if(id == "countryName"){
        let valueCountryName = document.getElementById("countryName").value;
        if(valueCountryName != "na"){
            let cityName = document.getElementById("cityName");
            cityName.removeAttribute("disabled");
            getCities(valueCountryName);
        }
    }else if(id == "regionsNameEdit"){
        let valueRegionsName = document.getElementById("regionsNameEdit").value;
        if(valueRegionsName != "na"){
            let countryName = document.getElementById("countryNameEdit");
            countryName.removeAttribute("disabled");
            getCountriesEdit(valueRegionsName);
        }
    }else if(id == "countryNameEdit"){
        let valueCountryName = document.getElementById("countryNameEdit").value;
        if(valueCountryName != "na"){
            let cityName = document.getElementById("cityNameEdit");
            cityName.removeAttribute("disabled");
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
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCountries");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
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
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCountriesEdit");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
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
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCities");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
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
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        let spanRegions = document.getElementById("spanCitiesEdit");
        spanRegions.innerText = "Código: "+code+". Mensaje: "+message;
        spanRegions.style.display = "block";
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

function createNewCompany(){
    let authorization = sessionStorage.getItem("authorization");
    let valueName = document.getElementById("inputName").value;
    let valueEmail = document.getElementById("inputEmail").value;
    let valuePhone = document.getElementById("inputPhone").value;
    let valueAddress = document.getElementById("inputAddress").value;
    let valueRegion = document.getElementById("regionsName").value;
    let valueCountry = document.getElementById("countryName").value;
    let valueCity = document.getElementById("cityName").value;
    let body = new Object();
    body.name = valueName;
    body.email = valueEmail;
    body.phone = valuePhone;
    body.address = valueAddress;
    if(valueRegion != "na"){
        body.regionId = valueRegion;
        body.countryId = valueCountry;
        body.cityId = valueCity;
    }else{
        body.regionId = undefined;
    }
    let createCompanies = createCompany(authorization,body);
    createCompanies.then((data)=>{
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

function editRecordCompany(id){
    let check = document.getElementById("popupEditCompany");
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    let index = indexOfArrayId(arrayCompanies, id);
    let idRegion = arrayCompanies[index].idRegion;
    document.getElementById("inputNameEdit").value = arrayCompanies[index].nameCompany;
    document.getElementById("inputEmailEdit").value = arrayCompanies[index].email;
    document.getElementById("inputPhoneEdit").value = arrayCompanies[index].phone;
    document.getElementById("inputAddressEdit").value = arrayCompanies[index].address;
    if(idRegion == null || idRegion == "" || idRegion == undefined){
        document.getElementById("regionsNameEdit").value = "na";
        document.getElementById("countryNameEdit").innerHTML = '<option value="na" id="defaultCountryEdit" hidden>Seleccionar país</option>';
        document.getElementById("cityNameEdit").innerHTML = '<option value="na" id="defaultCityEdit" hidden>Seleccionar ciudad</option>';
    }else{
        document.getElementById("regionsNameEdit").value = arrayCompanies[index].idRegion;
        document.getElementById("countryNameEdit").innerHTML = `<option value="${arrayCompanies[index].idCountry}" id="${arrayCompanies[index].idCountry}">${arrayCompanies[index].nameCountry}</option>`;
        document.getElementById("cityNameEdit").innerHTML = `<option value="${arrayCompanies[index].idCity}" id="${arrayCompanies[index].idCity}">${arrayCompanies[index].nameCity}</option>`;
    }
    check.checked = true;
}

function sendEditData(){
    let authorization = sessionStorage.getItem("authorization");
    let idCompany = localStorage.getItem("idCompany");
    let valueName = document.getElementById("inputNameEdit").value;
    let valueEmail = document.getElementById("inputEmailEdit").value;
    let valuePhone = document.getElementById("inputPhoneEdit").value;
    let valueAddress = document.getElementById("inputAddressEdit").value;
    let valueRegion = document.getElementById("regionsNameEdit").value;
    let valueCountry = document.getElementById("countryNameEdit").value;
    let valueCity = document.getElementById("cityNameEdit").value;
    let body = new Object();
    body.name = valueName;
    body.email = valueEmail;
    body.phone = valuePhone;
    body.address = valueAddress;
    if(valueRegion != "na"){
        body.regionId = valueRegion;
        body.countryId = valueCountry;
        body.cityId = valueCity;
    }else{
        body.regionId = undefined;
    }
    let updateCompanies = updateCompany(authorization,body,idCompany);
    updateCompanies.then((data)=>{
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

function deleteRecordCompany(id){
    let authorization = sessionStorage.getItem("authorization");
    let deleteRecord = deleteCompany(authorization,id);
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

function selectionCompany(event){
    let id = event.target.id;
    let check = event.target.checked;
    let newCheck = new companiesCheck ();
    let child = document.getElementById(id);
    let parent = child.parentNode;
    if (check == true && countCheck == 0){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        parent.style.backgroundColor = "rgba(0,0,0,0.05)";
        arrayCompaniesCheck.push(newCheck);
        countCheck = countCheck + 1;
    }else if(check == true && countCheck >= 1){
        let parentId = parent.id;
        newCheck.id = parentId;
        newCheck.checkId = id;
        arrayCompaniesCheck.push(newCheck);
        let i = 0;
        for(i in arrayCompaniesCheck){
            let checkId = arrayCompaniesCheck[i].checkId;
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
        for(i in arrayCompaniesCheck){
            let checkId = arrayCompaniesCheck[i].checkId;
            if(checkId == id){
                arrayCompaniesCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
    }else if (check == false && countCheck == 2){
        parent.style.backgroundColor = "#FFFFFF";
        let i = 0;
        for (i in arrayCompaniesCheck){
            let checkId = arrayCompaniesCheck[i].checkId;
            if(checkId != id){
                let check = document.getElementById(checkId);
                let parentCheck = check.parentNode;
                parentCheck.style.backgroundColor = "rgba(0,0,0,0.05)";
            }
        }
        for(i in arrayCompaniesCheck){
            let checkId = arrayCompaniesCheck[i].checkId;
            if(checkId == id){
                arrayCompaniesCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        countSelection.style.display = "none";
    }else if (check == false && countCheck > 2){
        parent.style.backgroundColor = "#FFFFFF";
        let i = 0;
        for(i in arrayCompaniesCheck){
            let checkId = arrayCompaniesCheck[i].checkId;
            if(checkId == id){
                arrayCompaniesCheck.splice(i,1);
            }
        }
        countCheck = countCheck - 1;
        let countSelection = document.getElementById("countSelection");
        countSelection.innerText = `${countCheck} seleccionados`;
        countSelection.style.display = "block";
    }
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

function indexOfArrayName(name, value){
    for (let i = 0;i < name.length;i++){
        let valueArray = name[i].name;
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

class companiesCheck{
    constructor(id,checkId){
        this.id = id,
        this.checkId = checkId
    }
}