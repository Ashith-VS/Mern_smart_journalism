const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "ashith391@gmail.com",
    pass: "ashith@123",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "ashith391@gmail.com",
    to: "ashithvs23@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { main}

// main().catch(console.error);


// // server/utils/nodemailerConfig.js
// const nodemailer = require('nodemailer');

// // Create a transporter
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // You can use other services like 'SMTP', 'Mailgun', etc.
//   auth: {
//     // user: process.env.EMAIL_USER, // Your email address
//     // pass: process.env.EMAIL_PASS, // Your email password
//         user: "ashithvs23@gmail.com",
//         pass: "jn7jnAPss4f63QBp6D",
//   },
// });

// const sendVerificationEmail = (to, verificationToken) => {
//   const mailOptions = {
//     // from: process.env.EMAIL_USER,
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//      to: "bar@example.com, baz@example.com",
//     // to: to,
//     subject: 'Verify Your Email Address',
//     text: `Please verify your email address by clicking the following link: \n\n${process.env.BASE_URL}/verify-email?token=${verificationToken}`,
//     html: `<p>Please verify your email address by clicking the following link:</p>
//            <a href="${process.env.BASE_URL}/verify-email?token=${verificationToken}">Verify Email</a>`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports = { sendVerificationEmail };
