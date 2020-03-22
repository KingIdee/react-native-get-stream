const Helpers = require('../helpers/helper');

/**
 * Defines methods for validating Register functions
 *
 * @class AuthValidator
 */
class AuthValidator extends Helpers{

  constructor(){
    super();
  }

    /**
   * validates Login data
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateAuthLogin(req, res, next) {
    req.check('username', 'Username field is required').notEmpty().trim();
    req.check('password', 'Password field is required').notEmpty().trim();
    const errors = req.validationErrors();

    if (errors) {
        return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

   /**
   * validates Refresh Token
   * @param {object} req
   * @param {object} res
   * @param {callback} next
   */
  validateRefreshToken(req, res, next) {
    req.check('username', 'username field is required').notEmpty().trim();
    req.check('refreshToken', 'refreshToken is required').notEmpty().trim();
    req.check('id', 'user id is required').notEmpty().trim();
    const errors = req.validationErrors();

    if (errors) {
        return super.validationFailed(res, super.extractErrors(errors));
    }
    return next();
  }

  }
  module.exports = AuthValidator;