const express = require('express');
const route = express.Router();
const veryfy = require('../midleware/veryfyToken')
const routeAuth = require('../app/controller/authController');


route.get('/register',routeAuth.resgister);
route.post('/registed',routeAuth.registed);
route.post('/login',routeAuth.login);
route.post('/token',routeAuth.gettoken);
route.get('/token',routeAuth.loginToken);
route.get('/',routeAuth.index);

route.get('/veryfy',veryfy,routeAuth.veryfy);


route.get('/cokie',routeAuth.cokie)



module.exports = route;
