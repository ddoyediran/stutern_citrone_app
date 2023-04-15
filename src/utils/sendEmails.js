const nodemailer = require("nodemailer");

module.exports = async () => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: this.process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("email sent successfully")
    } catch (error) {
        console.log(error, "emai; not sent")
    }
}