const app = require("./app");

const mongoose = require("mongoose");

const { envsConfig } = require("./configs");

mongoose
  .connect(envsConfig.dbHost)
  .then(() => {
    app.listen(envsConfig.port, () => {
      console.log(
        `Server running. Database connection successful. Use our API on port: ${envsConfig.port} `
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
