const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseController = require('./BaseController');
const User = require('../models/User');
const secrets = require('../config/secrets');
const stream =  require('stream-chat');
const {StreamChat} = stream;

class AuthController extends BaseController{
 
  /**
   * @api {post} v1/auth/o/token Authenticate User
   * @apiName Authenticate User
   * @apiGroup Auth
   * @apiParam {String} username user's username
   * @apiParam {String} password user's password
   */
  async authenticate(req, res){
    const { password, username } = req.body;
    try{
      let user = await User.findOne({ username });
   
      if(user){
        const {firstName, _id, lastName} = user;
        let isPasswordValid = bcrypt.compareSync(password, user.password);
  
          if (isPasswordValid) {
            const client = new StreamChat(secrets.streamApiKey, secrets.streamSecret);
            const streamToken = client.createToken(username);
            let token = jwt.sign({ firstName, username, id: _id, lastName },secrets.jwtSecret,{expiresIn: secrets.jwtTtl});
            // genrates refresh long lived token
            
            let refreshToken = jwt.sign({ username, id: _id }, secrets.jwtRefreshSecret,{expiresIn: secrets.jwtRefreshTtl });
            
            user.refreshToken = refreshToken;
            req.body.userId = _id;

            user = await user.save();
  
            return super.success(res,{ token, user, refreshToken, streamToken }, 'Login Successful');

          } else {
            return super.unauthorized(res, 'Invalid Credentials');
          }
      }else{
        return super.notFound(res, "Account does not exist");
      }
    }catch(err){
        console.log(err);
        return super.unauthorized(res, 'Invalid Credentials 1');
    }
  }

  async getUsers(req, res){
    try{
      let user = await User.find({isActive: true});
      return super.success(res, user, 'users retrieved');
    }catch(err){
      return super.actionFailure(res, 'Could not get users')
    }
  }

  async getChannels(req, res){
    try{
      let user = await User.findById(req.body.userId);
      // , members: { $in: [user.username] } 
      const filter = { type: 'messaging'};
      const sort = { last_message_at: -1 };
      const client = new StreamChat(secrets.streamApiKey, secrets.streamSecret);
      const channels = await client.queryChannels(filter, sort, {
          // watch: true,
          // state: true,
        
      });
      let preChannels = []
      for (const c of channels) {
        // console.log(c.data, c.data.cid);
        preChannels.push(c.data);
    }
 
   
      return super.success(res, preChannels, 'channels retrived');
    }catch(err){
      console.log(err);
      return super.actionFailure(res, 'Could not get Channels')
    }
  }

  /**
   * 
   * @param {Object} req 
   * @param {Object} res 
   * @param {Object} next 
   * @api {post} v1/auth/o/token/refresh Refresh user token
   * @apiName Refresh User Token
   * @apiGroup Auth
   * @apiParam {String} email user's email
   * @apiParam {String} refreshToken User's refresh token
   */
  async refreshToken (req, res, next){
    try{
      let user = await User.findOne({_id: req.body.userId});
      if(user){
        let {firstName, lastName, _id, email} = user;
        let token = jwt.sign({ firstName, email, id: _id, lastName },secrets.jwtSecret,{expiresIn: secrets.jwtTtl});
        return super.success(res,{ token, user }, 'Token refresh Successful');  
      }else{
        return super.notFound(res, "Account does not exist");
      }
      
    }catch(err){
      
      return super.unauthorized(res, 'Invalid Credentials');
    }
  }
}

module.exports = AuthController;

