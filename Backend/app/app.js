const express = require ("express");
var {validateData} = require("./modules/dataValidations");
const variables = require('./modules/config');
const {associationData} = require('./modules/associationData');
const {validateUser} = require("./modules/validateUsers");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const app = express();
/*********************************
Descripción: Uso de middlewares
**********************************/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded());
app.use(express.json())
app.use(cors());
app.use(middleware);
/****************************************
Descripción: Uso del método POST
*****************************************/
app.post("/api/users/login",(req,res)=>{
    loginService(req,res);
})
app.post("/api/users/register",validateUser,(req,res)=>{
    createUser(req,res);
})
app.post("/api/regions/create",validateUser,(req,res)=>{
    createRegion(req,res);
})
app.post("/api/regions/country/create",validateUser,(req,res)=>{
    createCountry(req,res);
})
app.post("/api/regions/city/create",validateUser,(req,res)=>{
    createCity(req,res);
})
app.post("/api/companies/create",validateUser,(req,res)=>{
    createCompany(req,res);
})

app.post("/api/contacts/create",validateUser,(req,res)=>{
    createContacts(req,res);
})

app.post("/api/channels/create",validateUser,(req,res)=>{
    createChannels(req,res);
})
/****************************************
Descripción: Uso del método GET
*****************************************/
app.get("/api/users",validateUser,(req,res)=>{
    getUsers(req,res);
})
app.get("/api/users/:id",validateUser,(req,res)=>{
    getUsersId(req,res);
})
app.get("/api/regions",validateUser,(req,res)=>{
    getRegions(req,res);
})
app.get("/api/regions/all",validateUser,(req,res)=>{
    getRegionsAll(req,res);
})
app.get("/api/regions/country/:regionId",validateUser,(req,res)=>{
    getCountriesByRegion(req,res);
})
app.get("/api/regions/countries",validateUser,(req,res)=>{
    getCountriesAll(req,res);
})
app.get("/api/regions/city/:countryId",validateUser,(req,res)=>{
    getCitiesByCountry(req,res);
})
app.get("/api/companies",validateUser,(req,res)=>{
    getCompanies(req,res);
})
app.get("/api/contacts",validateUser,(req,res)=>{
    getContacts(req,res);
})
app.get("/api/contacts/spec/:array",validateUser,(req,res)=>{
    getContactsSpec(req,res);
})
app.get("/api/channels/:contactId",validateUser,(req,res)=>{
    getChannelsByContact(req,res);
})
/****************************************
Descripción: Uso del método PUT
*****************************************/
app.put("/api/users/update/:id",validateUser,(req,res)=>{
    updateUser(req,res);
})
app.put("/api/regions/country/update/:id",validateUser,(req,res)=>{
    updateCountry(req,res);
})
app.put("/api/regions/city/update/:id",validateUser,(req,res)=>{
    updateCity(req,res);
})
app.put("/api/companies/update/:id",validateUser,(req,res)=>{
    updateCompany(req,res);
})
app.put("/api/contacts/update/:id",validateUser,(req,res)=>{
    updateContact(req,res);
})
app.put("/api/channels/update/:id",validateUser,(req,res)=>{
    updateChannel(req,res);
})
/****************************************
Descripción: Uso del método DELETE
*****************************************/
app.delete("/api/users/delete/:id",validateUser,(req,res)=>{
    deleteUser(req,res);
})
app.delete("/api/regions/country/delete/:id",validateUser,(req,res)=>{
    deleteCountry(req,res);
})
app.delete("/api/regions/city/delete/:id",validateUser,(req,res)=>{
    deleteCity(req,res);
})
app.delete("/api/companies/delete/:id",validateUser,(req,res)=>{
    deleteCompany(req,res);
})
app.delete("/api/channels/delete/:id",validateUser,(req,res)=>{
    deleteChannel(req,res);
})
app.delete("/api/contacts/delete/:array",validateUser,(req,res)=>{
    deleteContact(req,res);
})
/****************************************
Descripción: Iniciar aplicación
*****************************************/
let port = variables.port;
app.listen(port,()=>{
    console.log("Aplicación Inicializando...");
})

function middleware(req,res,next){
    console.log("Middleware activo...");
    validateData(req,res,next);

}

function loginService(req,res){
    let method = "loginUser";
    associationData(req,res,method);
}

function createUser(req,res){
    let method = "createUser";
    associationData(req,res,method);
}

function createRegion(req,res){
    let method = "createRegion";
    associationData(req,res,method);
}

function createCountry(req,res){
    let method = "createCountry";
    associationData(req,res,method);
}

function createCity(req,res){
    let method = "createCity";
    associationData(req,res,method);
}

function createCompany(req,res){
    let method = "createCompany";
    associationData(req,res,method);
}

function createContacts(req,res){
    let method = "createContacts";
    associationData(req,res,method);
}

function createChannels(req,res){
    let method = "createChannels";
    associationData(req,res,method);
}

function getUsers(req,res){
    let method = "getUsers";
    associationData(req,res,method);
}

function getUsersId(req,res){
    let method = "getUserId";
    associationData(req,res,method);
}

function getRegions(req,res){
    let method = "getRegions";
    associationData(req,res,method);
}

function getRegionsAll(req,res){
    let method = "getRegionsAll";
    associationData(req,res,method);
}

function getCountriesByRegion(req,res){
    let method = "getCountriesByRegion";
    associationData(req,res,method);
}

function getCountriesAll(req,res){
    let method = "getCountriesAll";
    associationData(req,res,method);
}

function getCitiesByCountry(req,res){
    let method = "getCitiesByCountry";
    associationData(req,res,method);
}

function getCompanies(req,res){
    let method = "getCompanies";
    associationData(req,res,method);
}

function getContacts(req,res){
    let method = "getContacts";
    associationData(req,res,method);
}

function getContactsSpec(req,res){
    let method = "getContactsSpec";
    associationData(req,res,method);
}

function getChannelsByContact(req,res){
    let method = "getChannelsByContact";
    associationData(req,res,method);
}

function updateUser(req,res){
    let method = "updateUser";
    associationData(req,res,method);
}

function updateCountry(req,res){
    let method = "updateCountry";
    associationData(req,res,method);
}

function updateCity(req,res){
    let method = "updateCity";
    associationData(req,res,method);
}

function updateCompany(req,res){
    let method = "updateCompany";
    associationData(req,res,method);
}

function updateContact(req,res){
    let method = "updateContact";
    associationData(req,res,method);
}

function updateChannel(req,res){
    let method = "updateChannel";
    associationData(req,res,method);
}

function deleteUser(req,res){
    let method = "deleteUser";
    associationData(req,res,method);
}

function deleteCountry(req,res){
    let method = "deleteCountry";
    associationData(req,res,method);
}

function deleteCity(req,res){
    let method = "deleteCity";
    associationData(req,res,method);
}

function deleteCompany(req,res){
    let method = "deleteCompany";
    associationData(req,res,method);
}

function deleteChannel(req,res){
    let method = "deleteChannel";
    associationData(req,res,method);
}

function deleteContact(req,res){
    let method = "deleteContact";
    associationData(req,res,method);
}