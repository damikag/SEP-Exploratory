const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app").app;

app.listen(process.env.PORT, () => {
  console.log("server running on port 8888");
});
