const Helpers =  require('../helpers/helper');
const User =  require('./../models/User');

/**
 * Defines methods for validating Register functions
 *
 * @class RegisterValidator
 */
class RegisterValidator extends Helpers{
  
  constructor(){
    super();
  }
    /**
   * validates Registration data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  async validateRegister(req, res, next) {
    let hasEmail = null;
    let hasUsername = null;
    let {email, username} = req.body;
    try{
      hasEmail = await User.findOne({email});
      hasUsername = await User.findOne({username});
    }catch(error){
      
    }
    req.check('firstName', 'First Name is required').notEmpty().trim();
    req.check('lastName', 'Last Name is required').notEmpty().trim();
    req.check('username', 'Username is required').notEmpty().trim();
    req.check('email', 'Email field is required').notEmpty().trim().isEmail().withMessage('Invalid email');
    req.check('password', 'Password is required').notEmpty().trim().isLength({ min: 6 })
      .withMessage('password cannot be less then 6 characters');

    req.check('email', 'Email already exists')
      .custom(() => {
         return hasEmail == null ? true : false;
      });

    req.check('username', 'Username already exists')
      .custom(() => {
         return hasUsername == null ? true : false;
      });

    const errors = req.validationErrors();

    if (errors) {
        return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

  }
  module.exports = RegisterValidator;