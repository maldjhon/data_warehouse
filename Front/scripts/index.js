/*Definition variables*/
var buttonLogin = document.getElementById("login");
var inputUser = document.getElementById("user");

/*Add Event Listener*/
buttonLogin.addEventListener("click",()=>{
    loginUser();
});
inputUser.addEventListener("click", ()=>{
    document.getElementById("code").style.display = "none";
    document.getElementById("message").style.display = "none";
})
/*Fetchs async functions*/
async function getToken(body){
    let url = 'http://localhost:3000/api/users/login';
    const resp = await fetch (url,{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await resp.json();
    return data;
}

async function getUsers(authorization,id){
    let url = `http://localhost:3000/api/users/${id}`;
    const resp = await fetch (url,{
        headers:{
            authorization: "Bearer "+authorization
        }
    });
    const data = await resp.json();
    return data;
}

/*Functions*/
function loginUser(){
    let valueUser = document.getElementById("user").value;
    let valuePassword = document.getElementById("password").value;
    let login = new newLogin(valueUser,valuePassword);
    let dataToken = getToken(login);
    dataToken.then((data)=>{
        let code = data.code;
        if(code != null && code != "" && code != undefined){
            throw data;
        }else{
            let token = data.token;
            sessionStorage.setItem("authorization",token);
            goTopage(valueUser);
        }
    }).catch((data)=>{
        let code = data.code;
        let message = data.message;
        document.getElementById("code").innerText = code;
        document.getElementById("message").innerText = message;
        document.getElementById("code").style.display = "flex";
        document.getElementById("message").style.display = "flex";
        document.getElementById("user").value = "";
        document.getElementById("password").value = "";
    })
}

function goTopage(valueUser){
    let authorizationUsers = sessionStorage.getItem("authorization");
    let getUsersAll = getUsers(authorizationUsers,valueUser);
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
}

function getUsersData(data){
    let positionName = data[0].positionName;
    if(positionName == "Admin"){
        let a = document.createElement("a");
        a.href = './html/customersAdmin.html'
        a.click();
    }else{
        let a = document.createElement("a");
        a.href = './html/customers.html'
        a.click();
    }
}
/*Classes*/
class newLogin{
    constructor(user,password){
        this.user = user;
        this.password = password;
    }
}