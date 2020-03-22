const Helpers  = require('../helpers/helper');
const User  = require('./../models/User');

/**
 * Defines methods for validating ResetPassword functions
 *
 * @class ResetPasswordValidator
 */
class ResetPasswordValidator extends Helpers{
  
  constructor(){
    super();
  }
    /**
   * validates Registration data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  async validateResetPassword(req, res, next) {
    let hasUser = null;
    let email = req.body.email;
    try{
      hasUser = await User.findOne({email});
     
    }catch(error){
        
    }
    req.check('email', 'Email field is required').notEmpty().trim().isEmail().withMessage('Invalid email format');

    req.check('email', 'User with email does not exist')
      .custom(() => {
         return hasUser == null ? false: true;
      });
    
    const errors = req.validationErrors();

    if (errors) {
        return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

   /**
   * validates Advert signup
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateHasId(req, res, next) {
    req.check('token', 'Token is required').notEmpty().trim();
    req.check('password', 'Password is required').notEmpty().trim().isLength({ min: 6 })
    .withMessage('password cannot be less then 6 characters');;
    req.check('confirmPassword', 'Confirm Password is required').notEmpty().trim().isLength({ min: 6 })
    .withMessage('confirmPassword cannot be less then 6 characters');;
    req.check('email', 'Email field is required').notEmpty().trim().isEmail().withMessage('Invalid email format');
    req.check('password', 'Passwords do not match')
      .custom(() => {
         return req.body.password == req.body.confirmPassword
      });
    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

   /**
   * validates Advert signup
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateChangePassword(req, res, next) {
    req.check('oldPassword', 'oldPassword is required').notEmpty().trim().isLength({ min: 6 })
     .withMessage('password cannot be less then 6 characters');

    req.check('newPassword', 'newPassword is required').notEmpty().trim().isLength({ min: 6 })
     .withMessage('password cannot be less then 6 characters');

    req.check('confirmPassword', 'confirmPassword is required').notEmpty().trim().isLength({ min: 6 })
     .withMessage('password cannot be less then 6 characters');

    req.check('newPassword', 'Passwords do not match')
      .custom(() => {
         return req.body.newPassword == req.body.confirmPassword
      });
    const errors = req.validationErrors();

    if (errors) {
      return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

}
  module.exports = ResetPasswordValidator;