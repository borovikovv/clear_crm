const nodemailer = require("nodemailer");

const AppError = require("../utils/AppError");

class MailService {

    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "clear.crm2u@gmail.com",
            pass: "password_for_crm_2U"
        },
    });

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Hello ✔, you want to registration ${process.env.API_URL}`,
                text: "",
                html: `<div>
                        <h1>Account activation click link:</h1>
                        <a href=${link}>${link}</a>
                    </div>`,
            });
        } catch (e) {
            throw new AppError(e.message, 400);
        }
    }
};

module.exports = new MailService();