const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Define the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.APP_PASS,    // App password or email password
    },
});



// Send email function
const sendCredentialsEmail = async (req, res) => {
    const { email, username, password } = req.body;

    // Validate that email, username, and password exist
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Missing email, username, or password' });
    }
      // Create a formatted template for the email
      const emailTemplate = `
      Dear ${username},

      Welcome to Smart Journalism! We are excited to have you on board.

      Here are your account credentials:
      
      Username: ${email}
      Password: ${password}

      You can log in to your account using the credentials above.

      Best regards,
      The Smart Journalism Team
  `;


    const mailOptions = {
        from:{
            name: 'Smart Journalism',
            address: process.env.EMAIL_USER, 
        },   // Sender's email address
        to: email,                      // Recipient's email address
        subject: 'Your Account Credentials',
        text: emailTemplate,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
};


module.exports = { sendCredentialsEmail };
