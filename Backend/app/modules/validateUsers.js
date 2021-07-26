const {sequelize,Users,Postn,Regions,Countries,Cities} = require("../db/index");
const variables = require('./config');
const jwt = require("jsonwebtoken");

function validateUser(req,res,next){
    let url = req.url;
    let id = req.params.id;
    let idRegion = req.params.regionId;
    let idCountry = req.params.countryId;
    let array = req.params.array;
    let contactId = req.params.contactId;
    switch (url) {
        case "/api/users/register":
            validateUserAuthorization(req,res,next);
            break;
        case "/api/regions/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/regions/country/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/regions/city/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/companies/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/contacts/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/channels/create":
            validateAuthorization(req,res,next);
            break;
        case "/api/users":
            validateAuthorization(req,res,next);
            break;
        case `/api/users/${id}`:
            validateAuthorization(req,res,next);
            break;
        case "/api/regions":
            validateAuthorization(req,res,next);
            break;
        case "/api/regions/all":
            validateAuthorization(req,res,next);
            break;
        case `/api/regions/country/${idRegion}`:
            validateAuthorization(req,res,next);
            break;
        case "/api/regions/countries":
            validateAuthorization(req,res,next);
            break;
        case `/api/regions/city/${idCountry}`:
            validateAuthorization(req,res,next);
            break;
        case "/api/companies":
            validateAuthorization(req,res,next);
            break;
        case "/api/contacts":
            validateAuthorization(req,res,next);
            break;
        case `/api/contacts/spec/${array}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/channels/${contactId}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/users/update/${id}`:
            validateUserAuthorization(req,res,next);
            break;
        case `/api/regions/country/update/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/regions/city/update/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/companies/update/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/contacts/update/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/channels/update/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/users/delete/${id}`:
            validateUserAuthorization(req,res,next);
            break;
        case `/api/regions/country/delete/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/regions/city/delete/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/companies/delete/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/channels/delete/${id}`:
            validateAuthorization(req,res,next);
            break;
        case `/api/contacts/delete/${array}`:
            validateAuthorization(req,res,next);
            break;
        default:
            next();
            break;
    }
}

function validateUserAuthorization(req,res,next){
    let secret = variables.jwtSecret;
    let credential = req.headers.authorization;
    try{
        let token = credential.split(' ')[1];
        let decoded = jwt.verify(token,secret);
        let userDecoded = decoded.user;
        Users.findAll({
            attributes: ['postnId'],
            where:{
                email: userDecoded
            }
        }).then((result)=>{
            if(result == null || result == "" || result == undefined){
                let code = "401";
                let message = "No fue posible autenticar el usuario";
                let newError = new errors(code,message);
                res.status(401).send(newError);
                return;
            }else{
                let profile = result[0].dataValues.postnId;
                if(profile == 1){
                    next();
                }else{
                    let code = "401";
                    let message = "El usuario no cuenta con perfil administrador para esta petición";
                    let newError = new errors(code,message);
                    res.status(401).send(newError);
                    return;
                }
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err.original;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }catch(err){
        let code = "401";
        let message = "No fue posible autenticar el usuario";
        let newError = new errors(code,message);
        res.status(401).send(newError);
        return;
    }
}

function validateAuthorization(req,res,next){
    let secret = variables.jwtSecret;
    let credential = req.headers.authorization;
    try{
        let token = credential.split(' ')[1];
        jwt.verify(token,secret);
        next();
    }catch(err){
        let code = "401";
        let message = "No fue posible autenticar el usuario";
        let newError = new errors(code,message);
        res.status(401).send(newError);
        return;
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

module.exports = {validateUser}