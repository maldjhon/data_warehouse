/*Definition variables*/
var buttonCreateRegion = document.getElementById("createRegion");
var inputClose = document.getElementById("checkClose");
var inputCloseCountry = document.getElementById("checkCloseCountry");
var inputCloseCountryEdit = document.getElementById("checkCloseCountryEdit");
var inputCloseCity = document.getElementById("checkCloseCity");
var inputCloseCityEdit = document.getElementById("checkCloseCityEdit");
var buttonSaveRegion = document.getElementById("saveRegion");
var buttonSaveCountry = document.getElementById("saveCountry");
var buttonSaveCountryEdit = document.getElementById("saveCountryEdit");
var buttonSaveCity = document.getElementById("saveCity");
var buttonSaveCityEdit = document.getElementById("saveCityEdit");
var toggler = document.getElementsByClassName("caret");
var arrayCities = new Array();
var arrayCountries = new Array();
/*Add Event Listener*/
buttonCreateRegion.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    document.getElementById("checkRegion").checked = true;
});
inputClose.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("checkRegion").checked = false;
});
inputCloseCountry.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("checkCountry").checked = false;
});
inputCloseCountryEdit.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("checkCountryEdit").checked = false;
});
inputCloseCity.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("checkCity").checked = false;
});
inputCloseCityEdit.addEventListener("click",()=>{
    let modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
    document.getElementById("checkCityEdit").checked = false;
});
buttonSaveRegion.addEventListener("click",()=>{
    createNewRegion();
});
buttonSaveCountry.addEventListener("click",()=>{
    createNewCountry();
});
buttonSaveCountryEdit.addEventListener("click",()=>{
    updateRecordCountry();
});
buttonSaveCity.addEventListener("click",()=>{
    createNewCity();
});
buttonSaveCityEdit.addEventListener("click",()=>{
    updateRecordCity();
});
document.addEventListener("click",(event)=>{
    let className = event.target.className;
    if(className == "nameRegion"){
        regionTree(event);
    }else if(className == "nameRegion caret-down"){
        hideRegionTree(event);
    }else if(className == "createButtonCountry"){
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        document.getElementById("checkCountry").checked = true;
        let id = event.target.id;
        localStorage.setItem("idRegion",id);
    }else if(className == "createButtonCity"){
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        document.getElementById("checkCity").checked = true;
        let id = event.target.id;
        localStorage.setItem("idCountry",id);
    }else if(className == "deleteButtonCountry"){
        let id = event.target.id;
        localStorage.setItem("idCountry",id);
        deleteRecordCountry();
    }else if(className == "deleteButtonCity"){
        let id = event.target.id;
        localStorage.setItem("idCity",id);
        deleteRecordCity();
    }else if(className == "editButtonCountry"){
        let id = event.target.id;
        localStorage.setItem("idCountry",id);
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        document.getElementById("checkCountryEdit").checked = true;
    }else if(className == "editButtonCity"){
        let id = event.target.id;
        localStorage.setItem("idCity",id);
        let modal = document.querySelector(".modal");
        modal.style.visibility = "visible";
        document.getElementById("checkCityEdit").checked = true;
    }
})
/*Fetchs async functions*/
async function createRegion(authorization,body){
    let url = 'http://localhost:3000/api/regions/create';
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

async function createCountry(authorization,body){
    let url = 'http://localhost:3000/api/regions/country/create';
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

async function createCity(authorization,body){
    let url = 'http://localhost:3000/api/regions/city/create';
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
    let url = 'http://localhost:3000/api/regions';
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

async function updateCountry(authorization,id,body){
    let url = `http://localhost:3000/api/regions/country/update/${id}`;
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

async function updateCity(authorization,id,body){
    let url = `http://localhost:3000/api/regions/city/update/${id}`;
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

async function deleteCountry(authorization,id){
    let url = `http://localhost:3000/api/regions/country/delete/${id}`;
    const resp = await fetch (url,{
        method:'DELETE',
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = resp;
    return data;
}

async function deleteCity(authorization,id){
    let url = `http://localhost:3000/api/regions/city/delete/${id}`;
    const resp = await fetch (url,{
        method:'DELETE',
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = resp;
    return data;
}

let authorizationRegion = sessionStorage.getItem("authorization");
let getNewRegions = getRegion(authorizationRegion);
getNewRegions.then((data)=>{
    let code = data.code;
    if(code != null && code != "" && code != undefined){
        throw data;
    }else{
        getDataRegion(data);
    }
}).catch((data)=>{
    let code = data.code;
    let message = data.message;
    let errorRegion = document.getElementById("errorRegion");
    if(errorRegion == null || errorRegion == "" || errorRegion == undefined){
        let containerRegions = document.getElementById("containerRegions");
        let span = document.createElement("span");
        span.id = "errorRegion";
        span.innerText = "Código: "+code+". Mensaje: "+message;
        span.style.display = "block"
        containerRegions.append(span);
    }else{
        errorRegion.innerText = "Código: "+code+". Mensaje: "+message;
        errorRegion.style.display = "block";
    }
})

/*Functions*/
function createNewRegion(){
    let authorization = sessionStorage.getItem("authorization");
    let body = new Object;
    let name = document.getElementById("inputRegion").value;
    body.name = name;
    let create = createRegion(authorization,body);
    create.then((data)=>{
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

function createNewCountry(){
    let authorization = sessionStorage.getItem("authorization");
    let body = new Object;
    let name = document.getElementById("inputCountry").value;
    let idRegion = localStorage.getItem("idRegion");
    body.name = name;
    body.regionId = idRegion;
    let create = createCountry(authorization,body);
    create.then((data)=>{
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

function createNewCity(){
    let authorization = sessionStorage.getItem("authorization");
    let body = new Object;
    let name = document.getElementById("inputCity").value;
    let idCountry = localStorage.getItem("idCountry");
    body.name = name;
    body.countryId = idCountry;
    let create = createCity(authorization,body);
    create.then((data)=>{
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

function regionTree(event){
    let target = event.target;
    let parent = target.parentElement.parentElement.getElementsByClassName("regions");
    if(parent.length != 0){
        let i = 0;
        for(i; i < parent.length; i++){
            parent[i].classList.toggle("active");
        }
    }else{
        let child = target.parentElement.parentElement.getElementsByClassName("countries");
        if(child.length != 0){
            let j = 0;
            for(j; j < child.length; j++){
                child[j].classList.toggle("active");
            }
        }
    }
    target.classList.toggle("caret-down");
}

function hideRegionTree(event){
    let target = event.target;
    let parent = target.parentElement.parentElement.getElementsByClassName("nested");
    if(parent != null && parent != "" && parent != undefined){
        let i = 0;
        for(i; i < parent.length; i++){
            parent[i].classList.remove("active");
        }
    }
    target.classList.remove("caret-down");
}

function getDataRegion(data){
    let i = 0;
    let divContainer = document.getElementById("containerRegions");
    for(i in data){
        let ulGrandParent = document.createElement("ul");
        let liGrandParent = document.createElement("li");
        let idRegion = data[i].id;
        let nameRegion = data[i].name;
        liGrandParent.innerHTML = `<div class="caret" id="${idRegion}">
        <span class=nameRegion id="${idRegion}">${nameRegion}</span>
        <div class="containerButtonC" id="${idRegion}">
            <button class="createButtonCountry" id="${idRegion}">Agregar País</button>
        </div>
        </div>`;
        let countries = data[i].countries;
        let j = 0;
        for(j in countries){
            let ulParent = document.createElement("ul");
            ulParent.classList = "nested regions";
            let liParent = document.createElement("li");
            let idCountry = countries[j].id;
            let nameCountry = countries[j].name;
            liParent.innerHTML = `<div class="caret" id="${idCountry}">
            <div class=nameRegion>
                <span  id="${idCountry}">${nameCountry}</span>
                <div class="containerButtonUD" id="${idCountry}">
                    <button class="editButtonCountry" id="${idCountry}">Editar</button>
                    <button class="deleteButtonCountry" id="${idCountry}">Eliminar</button>
                </div>
            </div>
            <div class="containerButtonC" id="${idCountry}">
                <button class="createButtonCity" id="${idCountry}">Agregar Ciudad</button>
            </div>
            </div>`;
            let pushCountry = new arrayCoun (idCountry,idRegion);
            arrayCountries.push(pushCountry);
            let cities = countries[j].cities;
            let k = 0;
            for(k in cities){
                let ulChild = document.createElement("ul");
                ulChild.classList = "nested countries";
                let liChild = document.createElement("li");
                let idCity = cities[k].id;
                let nameCity = cities[k].name;
                liChild.innerHTML = `<div class="caret" id="${idCity}">
                <div class=nameRegion>
                    <span  id="${idCity}">${nameCity}</span>
                    <div class="containerButtonUD" id="${idCity}">
                        <button class="editButtonCity" id="${idCity}">Editar</button>
                        <button class="deleteButtonCity" id="${idCity}">Eliminar</button>
                    </div>
                </div>
                </div>`;
                let pushCity = new arrayCit (idCity,idCountry);
                arrayCities.push(pushCity);
                ulChild.appendChild(liChild);
                liParent.appendChild(ulChild);
            }
            ulParent.appendChild(liParent);
            liGrandParent.appendChild(ulParent);
        }
        ulGrandParent.appendChild(liGrandParent);
        divContainer.appendChild(ulGrandParent);
    }
}

function updateRecordCountry(){
    let authorization = sessionStorage.getItem("authorization");
    let body = new Object;
    let name = document.getElementById("inputCountryEdit").value;
    let id = localStorage.getItem("idCountry");
    body.name = name;
    let update = updateCountry(authorization,id,body);
    update.then((data)=>{
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

function updateRecordCity(){
    let authorization = sessionStorage.getItem("authorization");
    let body = new Object;
    let name = document.getElementById("inputCityEdit").value;
    let id = localStorage.getItem("idCity");
    body.name = name;
    let update = updateCity(authorization,id,body);
    update.then((data)=>{
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

function deleteRecordCountry(){
    let authorization = sessionStorage.getItem("authorization");
    let idCountry = localStorage.getItem("idCountry");
    let deleteRecord = deleteCountry(authorization,idCountry);
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

function deleteRecordCity(){
    let authorization = sessionStorage.getItem("authorization");
    let idCountry = localStorage.getItem("idCity");
    let deleteRecord = deleteCity(authorization,idCountry);
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

/* Classes*/
class arrayCoun {
    constructor (idCountry,idRegion){
        this.idCountry = idCountry,
        this.idRegion = idRegion
    }
}

class arrayCit {
    constructor (idCity,idCountry){
        this.idCity = idCity,
        this.idCountry = idCountry
    }
}