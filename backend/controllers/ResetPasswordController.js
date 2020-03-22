const BaseController = require('./BaseController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const ResetPassword = require('../models/v1/ResetPassword');
const ResetPasswordMail = require('./../../mail/ResetPasswordMail');
const ResetPasswordSuccessMail = require('./../mail/ResetPasswordSuccessMail');
const template = require('./../../resources/mail/resetEmail');
const successTemplate = require('./../../resources/mail/successEmailReset');
const moment = require('moment');
const secrets = require('../config/secrets');

class ResetPasswordController extends BaseController{
 
  /**
   * @api {post} v1/password/reset Reset Password Request
   * @apiName Reset Password Request
   * @apiGroup Reset Password
   * @apiParam {String} email user's email
   */
  async resetPasswordRequest (req, res) {
    const { email } = req.body;
    try{
        
        let tokenExpiry = moment().add(10, 'minutes').toString();
        let token = super.generateRandomUuid();
        let resetPassword = await ResetPassword.findOne({email});
        if(resetPassword){
            // check for deprecation
            await resetPassword.update({token, tokenExpiry});
        }else{
            let resetpassword = new ResetPassword({
                token,tokenExpiry,email, 
            });
            await resetpassword.save();
        }
        
        let mail = new ResetPasswordMail(template);
        let link = `${secrets.emailResetLinkBase}/${token}/${email}`;
        mail.sendMail({to: email, subject: 'Password Reset'},{link});
        return super.actionSuccess(res, 'Password Reset Link has been sent to your mail');
    }catch(err){
        
        return super.actionFailure(res, 'Could not Process email request at this moment');
    }
    
  }

  /**
   * @api {post} v1/password/change Change Password
   * @apiName Change Password
   * 
   * @apiGroup Change Password
   * @apiParam {String} oldPassword
   * @apiParam {String} newPassword
   * @apiParam {String} confirmPassword
   */
  async changePassword (req, res) {
    const { userId, oldPassword, newPassword } = req.body;

    try{
        let user = await User.findOne({_id: userId});
        if (!user){
            return super.notFound(res, 'User does not exist');
        }
        let isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

        if(isPasswordValid){
            let hashedPassword = bcrypt.hashSync(newPassword, 8);
            // check for deprecation
            await user.updateOne({password: hashedPassword});
            return super.actionSuccess(res, 'Your password has been changed');
        }

        return super.actionFailure(res, 'Wrong Password');
    }catch(err){
        console.log(err);
        return super.actionFailure(res, 'Could not Change Password');
    }
    
  }

  /**
   * @api {post} v1/password/confirm Process Password Reset Request
   * @apiName Process Password Reset Request
   * @apiGroup Reset Password
   * @apiParam {String} email user's email
   * @apiParam {String} token token sent to user's mail
   * @apiParam {String} password new password of user
   * @apiParam {String} confirmPassword confirm password of user
   */
  async proccessPasswordReset (req, res) {
    
    const { email, token, password} = req.body;
    try{
        let resetPassword = await ResetPassword.findOne({email, token});
        if(resetPassword){
            let time = moment(resetPassword.tokenExpiry).diff(moment(), 'seconds');
            if(time > 0){
                let user = await User.findOne({email});
                let hashedPassword = bcrypt.hashSync(password, 8);
                user.password = hashedPassword;
                await user.save();
                let mail = new ResetPasswordSuccessMail(successTemplate);
                mail.sendMail({to: email, subject: 'Password Reset Successful'},{});
                await resetPassword.remove();
                return super.actionSuccess(res, 'Password Reset Successful');
            }else{
                return super.actionFailure(res, 'Invalid or expired Token');
            }

        }else{
            return super.actionFailure(res, 'Could not find password reset request ');
        }
        
    }catch(err){
        console.log(err);
        return super.actionFailure(res, 'Could not Process email request at this moment');
    }
    
  }


}

module.exports = ResetPasswordController;
