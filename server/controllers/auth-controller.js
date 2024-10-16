const sendEmail = require('../utils/send-email').sendEmail;
const otpEmailTemplate = require('../utils/emailTemplates/otpEmailTemplate').setOTP;
const {error_function, success_function} = require('../utils/response-handler');

exports.otp = async function(req, res) {
    try {
        let email = req.body.email;
    // console.log("email : ",email);
    function generateOtp(length) {
        let charset = "0123456789";
        let otp = "";
        
        for(var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random()*charset.length);
            otp += charset.charAt(randomIndex);
        }
        return otp;
    }
    var randomOtp = generateOtp(12);
    console.log("random otp : ",randomOtp);
    let emailTemplate = await otpEmailTemplate(email, randomOtp);
    await sendEmail(email, "otp for verification", emailTemplate);
    let response = success_function({
        statusCode : 200,
        message : "otp sent successfully",
        data : otp,
    });
    res.status(response.statusCode).send(response);
    return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : "something went wrong",
        });
        res.status(response.statusCode).send(response);
        return;
    }
}