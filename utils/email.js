const nodemailer = require("nodemailer");

const sendEmail = async options => {
  //1)  Create a transpoter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  console.log(`options: ${options.message}`);

  // 2) Define the email options
  const mailOptions = {
    from: "admin <email@hello.io",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
