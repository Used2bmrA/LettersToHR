import express from "express";
import { transporter } from "./transporter.js";

const router = express.Router();

router.post("/hr-contact", async (req, res) => {

    const {
        anonymous,
        category,
        subject,
        message,
        name,
        email,
        department,
    } = req.body;

    const html = anonymous
        ? `
            <h2>Anonymous HR Submission</h2>

            <b>Category:</b> ${category}<br>
            <b>Subject:</b> ${subject}<br><br>

            <b>Message</b><br>

            ${message}
        `
        : `
            <h2>HR Submission</h2>

            <b>Name:</b> ${name}<br>
            <b>Email:</b> ${email}<br>
            <b>Department:</b> ${department}<br><br>

            <b>Category:</b> ${category}<br>
            <b>Subject:</b> ${subject}<br><br>

            <b>Message</b><br>

            ${message}
        `;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.HR_EMAIL,
        subject: `[HR] ${subject}`,
        html,
    });

    res.json({
        success: true,
    });

});

export default router;