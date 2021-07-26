const {sequelize,Users, Postn,Regions,Countries,Cities,Companies,Contacts,Channels,ContactsToChannels} = require("../db/index");
const {Sequelize,Op} = require('sequelize');
const jwt = require("jsonwebtoken");
const variables = require('./config');

function associationData (req,res,method){
    switch (method) {
        case "loginUser":
            loginUser(req,res,method);
            break;
        case "createUser":
            createUser(req,res,method);
            break;
        case "createRegion":
            createRegion(req,res,method);
            break;
        case "createCountry":
            createCountry(req,res,method);
            break;
        case "createCity":
            createCity(req,res,method);
            break;
        case "createCompany":
            createCompany(req,res,method);
            break;
        case "createContacts":
            createContacts(req,res,method);
            break;
        case "createChannels":
            createChannels(req,res,method);
            break;
        case "getUsers":
            getUsers(req,res,method);
            break; 
        case "getUserId":
            getUserId(req,res,method);
            break; 
        case "getRegions":
            getRegions(req,res,method);
            break;  
        case "getRegionsAll":
            getRegionsAll(req,res,method);
            break;
        case "getCountriesByRegion":
            getCountriesByRegion(req,res,method);
            break; 
        case "getCountriesAll":
            getCountriesAll(req,res,method);
            break;
        case "getCitiesByCountry":
            getCitiesByCountry(req,res,method);
            break;
        case "getCompanies":
            getCompanies(req,res,method);
            break;
        case "getContacts":
            getContacts(req,res,method);
            break;
        case "getChannelsByContact":
            getChannelsByContact(req,res,method);
            break;
        case "getContactsSpec":
            getContactsSpec(req,res,method);
            break;
        case "updateUser":
            updateUser(req,res,method);
            break;
        case "updateCountry":
            updateCountry(req,res,method);
            break; 
        case "updateCity":
            updateCity(req,res,method);
            break;
        case "updateCompany":
            updateCompany(req,res,method);
            break;
        case "updateContact":
            updateContact(req,res,method);
            break;
        case "updateChannel":
            updateChannel(req,res,method);
            break;    
        case "deleteUser":
            deleteUser(req,res,method);
            break;
        case "deleteCountry":
            deleteCountry(req,res,method);
            break; 
        case "deleteCity":
            deleteCity(req,res,method);
            break; 
        case "deleteCompany":
            deleteCompany(req,res,method);
            break;
        case "deleteChannel":
            deleteChannel(req,res,method);
            break;
        case "deleteContact":
            deleteContact(req,res,method);
            break;   
        default:
            break;
    }
}

function loginUser(req,res,method){
    let user = req.body.user;
    let password = req.body.password;
    let pass = Sequelize.fn('SHA1',password);
    Users.findAll({
        attributes: [["password","PWDB"],[pass,"PWAPP"]],
        where:{
            email: user
        }
    }).then((result)=>{
        if (result == null || result == "" || result == undefined){
            let code = "404";
            let message = "El usuario que esta consultando no existe o no se encuentra";
            let newError = new errors(code,message);
            res.status(404).send(newError);
        }else{
            let user = req.body.user;
            let secret = variables.jwtSecret;
            let passwordDataBase = result[0].dataValues.PWDB;
            let passwordApplication = result[0].dataValues.PWAPP;
            if(passwordDataBase == passwordApplication){
                const token = jwt.sign({user},secret);
                let newToken = new tokens(token); 
                res.status(200).send(newToken);
            }else{
                let code = "401";
                let message = "La contraseña es incorrecta";
                let newError = new errors(code,message);
                res.status(401).send(newError);
            }   
        }  
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function createUser(req,res,method){
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let profile = req.body.profile;    
    if(profile == "Admin"){
        let pass = Sequelize.fn('SHA1',password)
        Users.create({
            name: name,
            email: email,
            password: pass,
            postnId: 1
        },{fields:['name','email','password','postnId']}).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id); 
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }else{
        let pass = Sequelize.fn('SHA1',password)
        Users.create({
            name: name,
            email: email,
            password: pass
        },{fields:['name','email','password']}).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id); 
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }
}

function createRegion(req,res,method){
    let name = req.body.name;
    Regions.create({
        name: name
    },{fields:['name']
    }).then((result)=>{
        let id = result.dataValues.id;
        let newId = new ids(id); 
        res.status(201).send(newId);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function createCountry(req,res,method){
    let name = req.body.name;
    let id = req.body.regionId;
    Countries.create({
        name: name,
        regionId: id
    },{fields:['name','regionId']
    }).then((result)=>{
        let id = result.dataValues.id;
        let newId = new ids(id); 
        res.status(201).send(newId);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function createCity(req,res,method){
    let name = req.body.name;
    let id = req.body.countryId;
    Cities.create({
        name: name,
        countryId: id
    },{fields:['name','countryId']
    }).then((result)=>{
        let id = result.dataValues.id;
        let newId = new ids(id); 
        res.status(201).send(newId);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function createCompany(req,res,method){
    let name = req.body.name;
    let address = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    let regionId = req.body.regionId;
    if(regionId == null || regionId == undefined || regionId == "" || regionId == "na"){
        Companies.create({
            name: name,
            address: address,
            email: email,
            phone: phone
        },{fields:['name','address','email','phone']
        }).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id); 
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }else{
        let countryId = req.body.countryId;
        let cityId = req.body.cityId;
        Companies.create({
            name: name,
            address: address,
            email: email,
            phone: phone,
            regionId: regionId,
            countryId: countryId,
            cityId: cityId
        },{fields:['name','address','email','phone','regionId','countryId','cityId']
        }).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id); 
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }
}

function createContacts(req,res,method){
    let fstname = req.body.fstname;
    let lstName = req.body.lstName;
    let ocupation = req.body.ocupation;
    let address = req.body.address;
    let email = req.body.email;
    let interest = req.body.interest;
    let companyId = req.body.companyId;
    let regionId = req.body.regionId; 
    let channels = req.body.channels;
    if(regionId == null || regionId == undefined){
        Contacts.create({
            fstName: fstname,
            lstName: lstName,
            ocupation: ocupation,
            address: address,
            email: email,
            interest: interest,
            companyId: companyId
        },{fields:['fstName','lstName','ocupation','address','email','interest', 'companyId']
        }).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id);
            associateContactToChannel(id,channels); 
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }else{
        let countryId = req.body.countryId;
        let cityId = req.body.cityId;
        Contacts.create({
            fstName: fstname,
            lstName: lstName,
            ocupation: ocupation,
            address: address,
            email: email,
            interest: interest,
            regionId: regionId,
            countryId: countryId,
            cityId: cityId,
            companyId: companyId
        },{fields:['fstName','lstName','ocupation','address','email','interest','regionId','countryId','cityId','companyId']
        }).then((result)=>{
            let id = result.dataValues.id;
            let newId = new ids(id); 
            associateContactToChannel(id,channels);
            res.status(201).send(newId);
            return;
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }
}

function createChannels(req,res,method){
    let name = req.body.name;
    let accountUser = req.body.accountUser;
    let preference = req.body.preference;
    Channels.create({
        name: name,
        accountUser: accountUser,
        preference: preference
    },{fields:['name','accountUser','preference']
    }).then((result)=>{
        let id = result.dataValues.id;
        let newId = new ids(id); 
        createContactToChannel(id);
        res.status(201).send(newId);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getUsers(req,res,method){
    let sql = 'SELECT users.id, users.name as userName, users.email, postn.name as positionName FROM users LEFT OUTER JOIN postn ON users.postnId = postn.id';
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i]);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getUserId(req,res,method){
    let id = req.params.id;
    let sql = `SELECT users.id, users.name as userName, users.email, postn.name as positionName FROM users LEFT OUTER JOIN postn ON users.postnId = postn.id WHERE users.email = '${id}'`;
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i]);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getRegions(req,res,method){
    let sql = 'SELECT regions.id as idRegion, regions.name AS regionsName, countries.id AS idCountry, countries.name AS countriesName, cities.id AS idCity, cities.name AS citiesName FROM regions LEFT OUTER JOIN countries ON regions.id = countries.regionId LEFT OUTER JOIN cities ON countries.id = cities.countryId ORDER BY regions.id, countries.id';
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let arrayRegion = new Array();
            let arrayCountry = new Array();
            let arrayCity = new Array();
            let idRegionOld = "";
            let idCountryOld = "";
            let idRegionNext = "";
            let idCountryNext = "";
            let indexNext = 0;
            for(i; i < result.length; i++){
                let idRegion = result[i].idRegion;
                let idCountry = result[i].idCountry;
                let idCity = result[i].idCity;
                let nameRegion = result[i].regionsName;
                let nameCountry = result[i].countriesName;
                let nameCity = result[i].citiesName;
                let newRegion = new Object;
                let newCountry = new Object;
                let newCity = new Object;
                if(i < result.length-1){
                    indexNext = i + 1;
                }
                idRegionNext = result[indexNext].idRegion;
                idCountryNext = result[indexNext].idCountry;
                if(nameCity != null && nameCity != "" && nameCity != undefined){
                    newCity.id = idCity;
                    newCity.name = nameCity;
                    arrayCity.push(newCity);
                }
                if(idCountryNext != idCountry || i == result.length-1){
                    if(nameCountry != null && nameCountry != "" && nameCountry != undefined){
                        newCountry.id = idCountry;
                        newCountry.name =  nameCountry;
                        newCountry.cities = arrayCity;
                        arrayCountry.push(newCountry); 
                        arrayCity = []; 
                    }                  
                }
                if(idRegionNext != idRegion || i == result.length-1){
                    newRegion.id = idRegion;
                    newRegion.name = nameRegion;
                    newRegion.countries = arrayCountry;
                    arrayRegion.push(newRegion);
                    arrayCountry = [];
                }
                idRegionOld = idRegion;
                idCountryOld = idCountry;
            }
            res.status(200).send(arrayRegion)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getRegionsAll(req,res){
    Regions.findAll({
        attributes:["id","name"]
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i].dataValues);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getCountriesByRegion(req,res){
    let idRegion = req.params.regionId;
    Countries.findAll({
        attributes:["id","name"],
        where:{
            regionId: idRegion
        }
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i].dataValues);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getCountriesAll(req,res){
    Countries.findAll({
        attributes:["id","name"]
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i].dataValues);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getCitiesByCountry(req,res){
    let idCountry = req.params.countryId;
    Cities.findAll({
        attributes:["id","name"],
        where:{
            countryId: idCountry
        }
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i].dataValues);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getCompanies(req,res){
    let sql = 'SELECT companies.id, companies.name as nameCompany, companies.address, companies.email, companies.phone, regions.id as idRegion, regions.name as nameRegion, countries.id AS idCountry, countries.name AS nameCountry, cities.id as idCity, cities.name as nameCity FROM companies LEFT OUTER JOIN regions ON companies.regionId = regions.id LEFT OUTER JOIN countries ON companies.countryId = countries.id LEFT OUTER JOIN cities ON companies.cityId = cities.id';
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i]);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getContacts(req,res){
    let sql = 'SELECT contacts.id, contacts.fstName as fisrtName, contacts.lstName as lastName, contacts.address, contacts.email, contacts.ocupation, contacts.interest, regions.id as idRegion, regions.name as nameRegion, countries.id AS idCountry, countries.name AS nameCountry, cities.id as idCity, cities.name as nameCity, companies.id as idCompany, companies.name as nameCompany FROM contacts LEFT OUTER JOIN regions ON contacts.regionId = regions.id LEFT OUTER JOIN countries ON contacts.countryId = countries.id LEFT OUTER JOIN cities ON contacts.cityId = cities.id LEFT OUTER JOIN companies ON contacts.companyId = companies.id';
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i]);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getContactsSpec(req,res){
    let arraySearch = req.params.array;
    let data = JSON.parse(arraySearch);
    Contacts.findAll({
        attributes:["id","fstName","lstName","ocupation","interest","email"],
        where: data,
        include: [Regions,Countries,Companies]
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i].dataValues);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function getChannelsByContact(req,res){
    let contactId = req.params.contactId;
    let sql = `SELECT channels.id, channels.name, channels.accountUser, channels.preference FROM channels LEFT OUTER JOIN contactsTochannels ON channels.id = contactsTochannels.channelId WHERE contactsTochannels.contactId = ${contactId}`;
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    }).then((result)=>{
        if(result == null || result == "" || result == undefined){
            let code = "404";
            let message = "No se ha encontrado ningún resultado";
            let newError = new errors(code,message);
            res.status(404).send(newError)
        }else{
            let i = 0;
            let array = new Array();
            for(i; i < result.length; i++){
                array.push(result[i]);
            }
            res.status(200).send(array)
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function updateUser(req,res){
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let profile = req.body.profile;
    let password = req.body.password;
    let updateUser = new Object;
    updateUser.name = name;
    updateUser.email = email;
    updateUser.profile = profile;
    if(password != null && password != "" && password != undefined){
        let pass = Sequelize.fn('SHA1',password)
        updateUser.password = pass;
    }
    Users.update(updateUser,
        {
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El usuario que se esta actualizando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function updateCountry(req,res){
    let id = req.params.id;
    let name = req.body.name;
    Countries.update({
        name: name
        },
        {
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El país que se esta actualizando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function updateCity(req,res){
    let id = req.params.id;
    let name = req.body.name;
    Cities.update({
        name: name
        },
        {
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "La ciudad que se esta actualizando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}
function updateCompany(req,res){
    let id = req.params.id;
    let name = req.body.name;
    let address = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    let regionId = req.body.regionId;
    let countryId = req.body.countryId;
    let cityId = req.body.cityId;
    let updateCompany = new Object;
    updateCompany.name = name;
    updateCompany.address = address;
    updateCompany.email = email;
    updateCompany.phone = phone;
    if(regionId == null || regionId == "" || regionId == undefined){
        Companies.update(updateCompany,{
            where:{
                id: id
            }
        }).then((result)=>{
            if(result > 0){
                res.status(200).send();
            }else{
                let code = "404";
                let message = "La companía que se esta actualizando no se encuentra o no existe";
                let newError = new errors(code,message);
                res.status(404).send(newError);
                return;
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }else{
        updateCompany.regionId = regionId;
        updateCompany.countryId = countryId;
        updateCompany.cityId = cityId;
        Companies.update(updateCompany,{
            where:{
                id: id
            }
        }).then((result)=>{
            if(result > 0){
                res.status(200).send();
            }else{
                let code = "404";
                let message = "La companía que se esta actualizando no se encuentra o no existe";
                let newError = new errors(code,message);
                res.status(404).send(newError);
                return;
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        })
    }
}

function updateContact(req,res){
    let contactId = req.params.id;
    let fstname = req.body.fstname;
    let lstName = req.body.lstName;
    let ocupation = req.body.ocupation;
    let address = req.body.address;
    let email = req.body.email;
    let interest = req.body.interest;
    let companyId = req.body.companyId;
    let regionId = req.body.regionId; 
    let channels = req.body.channels;
    if(regionId == null || regionId == undefined || regionId == ""){
        Contacts.update({
            fstName: fstname,
            lstName: lstName,
            ocupation: ocupation,
            address: address,
            email: email,
            interest: interest,
            companyId: companyId
        },{
            where: {
                id: contactId
            }
        }).then((result)=>{
            if(result > 0){
                associateContactToChannel(contactId,channels); 
                res.status(200).send();
            }else{
                let code = "404";
                let message = "El contacto que se esta actualizando no se encuentra o no existe";
                let newError = new errors(code,message);
                res.status(404).send(newError);
                return;
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        }) 
    }else{
        let countryId = req.body.countryId;
        let cityId = req.body.cityId;
        Contacts.update({
            fstName: fstname,
            lstName: lstName,
            ocupation: ocupation,
            address: address,
            email: email,
            interest: interest,
            companyId: companyId,
            regionId: regionId,
            countryId: countryId,
            cityId: cityId
        },{
            where: {
                id: contactId
            }
        }).then((result)=>{
            if(result > 0){
                associateContactToChannel(contactId,channels); 
                res.status(200).send();
            }else{
                let code = "404";
                let message = "El contacto que se esta actualizando no se encuentra o no existe";
                let newError = new errors(code,message);
                res.status(404).send(newError);
                return;
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            res.status(500).send(newError);
            return;
        }) 
    }
}

function updateChannel(req,res){
    let id = req.params.id;
    let name = req.body.name;
    let accountUser = req.body.accountUser;
    let preference = req.body.preference;
    Channels.update({
        name: name,
        accountUser: accountUser,
        preference: preference
    },{where:{
        id: id
    }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El canal que se esta actualizando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteUser(req,res){
    let id = req.params.id;
    Users.destroy({
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El usuario que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteCountry(req,res){
    let id = req.params.id;
    Countries.destroy({
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El país que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteCity(req,res){
    let id = req.params.id;
    Cities.destroy({
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "La ciudad que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteCompany(req,res){
    let id = req.params.id;
    Companies.destroy({
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "La companía que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteChannel(req,res){
    let id = req.params.id;
    deleteContactToChannel(id);
    Channels.destroy({
        where: {
            id: id
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El canal que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function deleteContact(req,res){
    let arraySearch = req.params.array;
    let data = JSON.parse(arraySearch);
    let i = 0;
    let contactId = new Array();
    for (i; i < data.length; i++){
        let contactObj = new Object();
        let id = data[i].id;
        contactObj.contactId = id;
        contactId.push(contactObj);
    }
    deleteContactSelectedToChannel(contactId);
    Contacts.destroy({
        where: {
            [Op.or]: data
        }
    }).then((result)=>{
        if(result > 0){
            res.status(200).send();
        }else{
            let code = "404";
            let message = "El contacto que se esta eliminando no se encuentra o no existe";
            let newError = new errors(code,message);
            res.status(404).send(newError);
            return;
        }
    }).catch((err)=>{
        console.log(err);
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        res.status(500).send(newError);
        return;
    })
}

function createContactToChannel(id){
    ContactsToChannels.create({
        channelId: id
    },{fields:['channelId']
    }).then((result)=>{
        console.log(result);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        console.log(newError);
        return;
    })
}

function associateContactToChannel(id,channels){
    if (channels != null && channels != undefined && channels != ""){
        ContactsToChannels.update({
            contactId: id
            },
            {
            where: {
                [Op.or]: channels
            }
        }).then((result)=>{
            if(result > 0){
                console.log(result);
                return;
            }else{
                let code = "404";
                let message = "Los canales que se están actualizando no se encuentra o no existen";
                let newError = new errors(code,message);
                console.log(newError);
                return;
            }
        }).catch((err)=>{
            let code = "500";
            let message = "Conexión Fallida a la base de datos: "+err;
            let newError = new errors(code,message);
            console.log(newError);
            return;
        })
    }else{
        return;
    }
}

function deleteContactToChannel(id){
    ContactsToChannels.destroy({
        where:{
            channelId: id
        }
    }).then((result)=>{
        console.log(result);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        console.log(newError);
        return;
    })
}

function deleteContactSelectedToChannel(data){
    ContactsToChannels.destroy({
        where:{
            [Op.or]: data
        }
    }).then((result)=>{
        console.log(result);
        return;
    }).catch((err)=>{
        let code = "500";
        let message = "Conexión Fallida a la base de datos: "+err;
        let newError = new errors(code,message);
        console.log(newError);
        return;
    })
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

class tokens {
    constructor (token){
        this.token = token;
    }
}

class ids {
    constructor (id){
        this.id = id;
    }
}
module.exports ={associationData}