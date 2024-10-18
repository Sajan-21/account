const { error_function, success_function } = require("../utils/response-handler");
const users = require("../db/models/users");

exports.otpVerification = async function(req, res) {
    let body = req.body;
    console.log("body : ", body);

    let otp = body.otp;
    console.log("otp : ",otp);
    let email = body.email;
    console.log("email : ", email);

    try {
        let user = await users.findOne({ email });
        console.log("user : ", user);

        if (!user) {
            console.log("no user found");
            let response = error_function({
                statusCode: 404,
                message: "Email not registered. Please check your email address.",
            });
            res.status(response.statusCode).send(response);
            return;
        }
        
        if (user.otp !== otp) {
            let response = error_function({
                statusCode: 400,
                message: "Invalid OTP. Please check the OTP and try again.",
            });
            res.status(response.statusCode).send(response);
            return;
        }

        // OTP is correct, update it to null
        await users.updateOne({ email }, { $set: { otp: null } });
        console.log("OTP set to null");

        let response = success_function({
            statusCode: 200,
            message: `OTP verification succeeded`,
            data : user._id,
        });
        res.status(response.statusCode).send(response);

    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            statusCode: 500,
            message: error.message || "Something went wrong. Please try again.",
        });
        res.status(response.statusCode).send(response);
    }
};