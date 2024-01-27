require("dotenv").config();

const {
  DB_HOST,
  PORT,
  SECRET_KEY,
  BREVO_API_KEY,
  EMAIL,
  GMAIL_PASS,
  BASE_URL,
} = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
  secretKey: SECRET_KEY,
  brevoApiKey: BREVO_API_KEY,
  email: EMAIL,
  gmailPassword: GMAIL_PASS,
  baseUrl: BASE_URL,
};
