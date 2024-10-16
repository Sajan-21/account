exports.otp = async function(req, res) {
    let email = req.body.email;
    // console.log("email : ",email);
    let emailTemplate = await otpEmailTemplate(email, otp);
}