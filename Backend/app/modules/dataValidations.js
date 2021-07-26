function validateData(req,res,next){
    let url = req.url;
    switch (url) {
        case "/api/users/login":
            validateDataLogin(req,res,next);
            break;
        case "/api/users/register":
            validateDataRegister(req,res,next);
            break;
        case "/api/regions/create":
            validateDataRegions(req,res,next);
            break;
        case "/api/regions/country/create":
            validateDataCountry(req,res,next);
            break;
        case "/api/regions/city/create":
            validateDataCity(req,res,next);
            break;
        case "/api/companies/create":
            validateDataCompany(req,res,next);
            break;
        default:
            next();
            break;
    }
}

/**********************************************
Descripción: Uso de las funciones
***********************************************/
function validateDataLogin(req,res,next){
    let user = req.body.user;
    let password = req.body.password;
    if(user == null || user == "" || user == undefined || password == null || password == "" || password == undefined){
        let code = "400";
        let message = "El campo usuario y contraseña son requeridos por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

function validateDataRegister(req,res,next){
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let profile = req.body.profile;
    if(email == null || email == "" || email == undefined || name == null || name == "" || name == undefined || password == null || password == "" || password == undefined || profile == null || profile == "" || profile == undefined){
        let code = "400";
        let message = "El campo email, nombre, contraseña y perfil son requeridos por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

function validateDataRegions(req,res,next){
    let name = req.body.name;
    if(name == null || name == "" || name == undefined){
        let code = "400";
        let message = "El campo nombre es requerido por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

function validateDataCountry(req,res,next){
    let name = req.body.name;
    let id = req.body.regionId;
    if(name == null || name == "" || name == undefined || id == null || id == "" || id == undefined){
        let code = "400";
        let message = "El campo nombre y Id de la región son requeridos por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

function validateDataCity(req,res,next){
    let name = req.body.name;
    let id = req.body.countryId;
    if(name == null || name == "" || name == undefined || id == null || id == "" || id == undefined){
        let code = "400";
        let message = "El campo nombre y Id del país son requeridos por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

function validateDataCompany(req,res,next){
    let name = req.body.name;
    let address = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    if(name == null || name == "" || name == undefined || address == null || address == "" || address == undefined || email == null || email == "" || email == undefined || phone == null || phone == "" || phone == undefined){
        let code = "400";
        let message = "El campo nombre, dirección, email y teléfono son requeridos por favor validar el request";
        let newError = new errors(code,message);
        res.status(400).send(newError);
        return;
    }else{
        next();
    }
}

/**********************************************
Descripción: Uso de las clases
***********************************************/
class errors {
    constructor (code,message){
        this.code = code;
        this.message = message;
    }
}

module.exports = {validateData}