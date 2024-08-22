import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {

  try {
    // Create a transporter using Mailtrap's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io', 
      port: 587, 
      auth: {
        user: process.env.MAILTRAP_USER, 
        pass: process.env.MAILTRAP_PASS, 
      },
    });

    // Mail options
    console.log(to)
    const mailOptions = {
      from: `"cipherSchool@${process.env.EMAIL_USER}`,
      to, 
      subject, 
      html: htmlContent, 
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

  } 
  catch (error) {
    console.error('Error sending email:', error);
  }
};
