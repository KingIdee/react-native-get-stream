const express = require("express");
const routes = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthValdiator = require('../validations/AuthValidator');
const AuthMiddeware = require('../middleware/VerifyTokenMiddleware');

const validator = new AuthValdiator();
const auth = new AuthController();
const verify = new AuthMiddeware();

const {authenticate, refreshToken, getUsers, getChannels} = auth;
const {validateAuthLogin, validateRefreshToken} = validator;
const {verifyRefreshToken, verifyToken} = verify;

routes.post("/o/token",validateAuthLogin, authenticate);
routes.post("/o/token/refresh", validateRefreshToken, verifyRefreshToken, refreshToken);
routes.get("/users", verifyToken, getUsers);
routes.get("/channels", verifyToken, getChannels);
module.exports = routes;
