require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/db/db")


connectToDB();
app.listen(4000, () => {
  console.log(`✅ Server running on Port 4000`);
});
