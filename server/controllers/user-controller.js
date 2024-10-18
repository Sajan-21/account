const error_function = require('../utils/response-handler').error_function;
const success_function = require('../utils/response-handler').success_function;
const users = require('../db/models/users');
const otpEmailTemplate = require('../utils/email-template/otp-email-template').sendOtpTemplate;
const sendEmail = require('../utils/send-email').sendEmail;

exports.createUser = async function(req, res) {
    let body = req.body;
    let email = body.email;
    try {
        let count = await users.countDocuments({ email });
        console.log("count : ", count);

        if (count > 0) {
            let response = error_function({
                statusCode: 400,
                message: "User already exists",
            });

            res.status(response.statusCode).send(response);
            return;
        }
        function generateOtp(length) {
            let charset = "0123456789";
            let otp = "";
            
            for(var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random()*charset.length);
                otp += charset.charAt(randomIndex);
            }
            return otp;
        }
        var randomOtp = generateOtp(6);
        console.log("randomOtp : ",randomOtp);
        body.otp = randomOtp;
        await users.create(body);

        // let emailTemplate = await otpEmailTemplate(body.name, randomOtp);
        // await sendEmail(email, "otp verification for email", emailTemplate);

        let response = success_function({
            statusCode : 200,
            message : "user registered. verify the email using otp. Check your mail !",
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