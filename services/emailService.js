const nodemailer = require("nodemailer");
const { envsConfig } = require("../configs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envsConfig.email,
    pass: envsConfig.gmailPassword,
  },
});

const sendEmail = async (data) => {
  const receivingGmail = { ...data, from: envsConfig.email };
  await transporter.sendMail(receivingGmail);
  return true;
};

module.exports = sendEmail;

// const brevo = require("@getbrevo/brevo");
// const { envsConfig } = require("../configs");

// const apiInstance = new brevo.TransactionalEmailsApi();

// apiInstance.authentications.apiKey.apiKey = envsConfig.brevoApiKey;

// const receivingEmail = {
//   subject: "Account verification",
//   sender: { email: envsConfig.email },
//   to: [{ email: "mariyagulaya@gmail.com" }],
//   htmlContent:
//     "<html><body><h1>Congratulations! You successfully sent this example campaign via theBrevo API.</h1></body></html>",
// };

// apiInstance.sendTransacEmail(receivingEmail).then(() => {
//   console.log("Sended");
// });
