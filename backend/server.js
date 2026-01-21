require("dotenv").config();
const app = require("./app"); // import Express app

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
