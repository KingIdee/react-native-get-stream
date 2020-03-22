const express = require("express");
const RegisterController = require('./../controllers/RegisterController');
const RegisterValdiator = require('./../validations/RegisterValidator');

const  routes = express.Router();
const validator = new RegisterValdiator();
const reg = new RegisterController();

const {validateRegister} =  validator;
const {register} = reg;

routes.post("/register", validateRegister, register);
module.exports = routes;
