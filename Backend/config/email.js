import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

transporter.verify((error, success)=>{

    if(error){

        console.log("SMTP ERROR:");
        console.log(error);

    }else{

        console.log("SMTP SERVER READY");

    }

});


export default transporter;