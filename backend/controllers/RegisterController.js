const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const BaseController = require('./BaseController');
const User = require('../models/User');
const secrets = require('../config/secrets');
const stream =  require('stream-chat');
const {StreamChat} = stream;

class RegisterController extends BaseController{
    
   constructor(){
       super();
     
   }

  /**
   * @param {Object} req 
   * @param {Object} res 
   * @api {post} v1/auth/register Register User
   * @apiName Register User
   * @apiGroup Register
   * @apiParam {String} email user's email
   * @apiParam {String} firstName user's Firstname
   * @apiParam {String} lastName user's Lastname
   * @apiParam {String} username user's username
   * @apiParam {String} password user's password
   */
    async register (req, res) {
        
        const { email, password, firstName, username, lastName} = req.body;
        
        let hashedPassword = bcrypt.hashSync(password, 8);
        
        let user = new User({
            email, password: hashedPassword, firstName, lastName, 
            username
        });
       
        try{
            await user.save();

            const client = new StreamChat(secrets.streamApiKey, secrets.streamSecret);
            const streamToken = client.createToken(username);
            let token = jwt.sign({ firstName, username, id: user._id, lastName },secrets.jwtSecret,{expiresIn: secrets.jwtTtl});
            // genrates refresh long lived token
            
            let refreshToken = jwt.sign({ username, id: user._id }, secrets.jwtRefreshSecret,{expiresIn: secrets.jwtRefreshTtl });
            
            user.refreshToken = refreshToken;
            req.body.userId = user._id;

            user = await user.save();
            return super.success(res,{user, token, streamToken}, 'Registration Successful');
            
        }catch(error){
            console.log(error);
            return super.actionFailure(res, 'Something went wrong')
        }

  }

}

module.exports = RegisterController;
