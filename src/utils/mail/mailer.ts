import nodmailer from "nodemailer";

const transporter = nodmailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string, 10) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

/**
 * Core function to send any application email
 * @param {Object} options - Configuration options for the email
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} [options.text] - Plain text version of the email
 * @param {string} [options.html] - HTML formatted version of the email
 */

interface mailBody {
    to: string;
    subject: string;
    text: string;
    html: string;
}
const sendMail = async ({ to, subject, text, html }: mailBody) => {
    try {
        const mailOption = {
            from: "",
            to,
            subject,
            text,
            html
        }

        const info = await transporter.sendMail(mailOption);
        console.log(`Email successfully sent: ${info.messageId}`);
        return info;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error sending email: ${error.message}`);
            throw new Error('Email delivery failed.');
        }
    }
}

export default sendMail;

