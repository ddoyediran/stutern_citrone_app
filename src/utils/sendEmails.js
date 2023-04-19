
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'citroneapp123@gmail.com',
//         pass: 'lwhyohbattgywdgu',
//     },
// });

// const sendEmail = (email, subject, text) => {
//     const mailOptions = {
//         from: 'citroneapp123@gmail.com',
//         to: email,
//         subject: subject,
//         text: text
//     }

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log('Error in sending email  ' + error);
//             return true;
//         } else {
//             console.log('Email sent: ' + info.response);
//             return false;
//         }
//     });
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "citroneapp123@gmail.com ",
        pass: "lwhyohbattgywdgu"
      }
    });

    const mailOptions = {
      from: "citroneapp123@gmail.com ",
      to: email,
      subject: subject,
      text: text
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email successfully sent: ' + info.response);
  } catch (error) {
    console.error(error);
    return { sent: false, error: error.message };
  }
}

module.exports = sendMail;



// const nodemailer = require("nodemailer");

// const sendMail = async (email, subject, text) => {


//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             service: process.env.SERVICE,
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASS
//             }
//         });
//         console.log("code.......start")

//         const mailOptions = {
//             from: process.env.USER,
//             to: email,
//             subject: subject,
//             text: text
//         }

//         console.log("code.......2")
//         await transporter.sendMail(mailOptions, (err, info) => {
//             if(err)

//         })
//         console.log("code.......3")
//         console.log('Email sent: ' );
//     } catch (error) {
//         console.log(error, "Email was not sent")
//     }
// }

// module.exports = sendMail;