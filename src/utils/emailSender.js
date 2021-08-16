const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_HOST_USER,
            pass: process.env.EMAIL_HOST_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"Sameh Etman" <noreply@sameh.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    });
}

module.exports = sendEmail