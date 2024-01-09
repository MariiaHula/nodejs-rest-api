require("dotenv").config();

const { DB_HOST, PORT, SECRET_KEY } = process.env;

module.exports = {
  port: PORT,
  dbHost: DB_HOST,
  secretKey: SECRET_KEY,
};
