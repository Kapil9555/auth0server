import axios from "axios";
import nodemailer from "nodemailer";

const AUTH0_DOMAIN = process.env.AUTH_DOMAIN;

export const authController = async (req, res) => {
    const { token } = req.body;

    if (!AUTH0_DOMAIN) {
        return res.status(500).json({ error: "Server misconfiguration: AUTH_DOMAIN is missing" });
    }

    try {
        // Validate token with Auth0
        const response = await axios.get(`https://${AUTH0_DOMAIN}/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const userEmail = response.data.email;

        console.log("user check",userEmail)

        if (!userEmail) {
            return res.status(400).json({ error: "User email not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // await transporter.sendMail({
        //     from: process.env.EMAIL_USER,
        //     to: userEmail,
        //     subject: "Your Auth Token",
        //     text: `Here is your authentication token: ${token}`,
        // });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Auth0 Token Validation Error:", error.response?.data || error.message);
        res.status(400).json({ error: "Invalid token or failed email delivery" });
    }
};
