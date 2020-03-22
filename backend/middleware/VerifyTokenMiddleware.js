const jwt = require('jsonwebtoken');
const Middleware = require('./Middleware');
const secrets = require('./../config/secrets');

class VerifyTokenMiddleware extends Middleware{

  constructor(){
    super();
  }
  
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * Checks that the header has a valid token
   */
  verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token)
      return super.forbidden(res, 'No token provided.');
    token = token.replace('Bearer', '').trim();
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if (err){
        if (err instanceof jwt.TokenExpiredError){
          return super.expiredToken(res, 'Token has Expired');
        }

        if (err instanceof jwt.JsonWebTokenError){
          return super.unauthorized(res, 'Invalid Token');
        }
        return super.unauthorized(res, 'Failed to authenticate token.');
      }
      // if everything good, save to request for use in other routes
      req.body.userId = decoded.id;
      return next();
    });
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * Checks that the header has a valid token
   */
  verifyRefreshToken(req, res, next) {
    const {refreshToken, email, id} = req.body;
    if (!refreshToken)
      return super.forbidden(res, 'No token provided.');
    jwt.verify(refreshToken, secrets.jwtRefreshSecret, (err, decoded) => {
      
      if (err)
      return super.unauthorized(res, 'Failed to authenticate token.');
      // if everything good, save to request for use in other routes
      if(decoded.email == email && decoded.id == id){
        req.body.userId = decoded.id;
        return next();
      }else{
        return super.unauthorized(res, 'Invalid credentials');
      }
    });
  }
}

module.exports = VerifyTokenMiddleware;