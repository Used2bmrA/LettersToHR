import express from "express";
import resend from "../config/email.js";

const router = express.Router();


router.post("/hr-contact", async (req,res)=>{

    try {
        const {
            anonymous,
            category,
            subject,
            message,
            name,
            email,
            department
        } = req.body;

        let emailContent;

        if(anonymous){
            emailContent = `
       
            <h2>Anonymous HR Message</h2>

            <p>
            <strong>Category:</strong>
            ${category}
            </p>

            <p>
            <strong>Subject:</strong>
            ${subject}
            </p>

            <hr>

            <p>
            ${message}
            </p>

            `;


        } else {


            emailContent = `

            <h2>HR Message</h2>

            <p>
            <strong>Name:</strong>
            ${name}
            </p>


            <p>
            <strong>Email:</strong>
            ${email}
            </p>


            <p>
            <strong>Department:</strong>
            ${department}
            </p>


            <p>
            <strong>Category:</strong>
            ${category}
            </p>


            <p>
            <strong>Subject:</strong>
            ${subject}
            </p>


            <hr>


            <p>
            ${message}
            </p>

            `;

        }



        await resend.emails.send({

            from: "HR Contact <onboarding@resend.dev>",

            to: process.env.HR_EMAIL,

            subject: `[HR CONTACT] ${subject}`,

            html: emailContent

        });



        res.status(200).json({

            success:true,

            message:"Email sent successfully"

        });



    } catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            message:"Could not send email"

        });


    }

});


export default router;