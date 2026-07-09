import nodemailer from "nodemailer";

transporter.verify((error, success)=>{

    if(error){

        console.log("SMTP ERROR:");
        console.log(error);

    }else{

        console.log("SMTP SERVER READY");

    }

});

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});


export default transporter;