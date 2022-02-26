const http = require("http");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = require("./app");

const mongoUrl = config;
mongoose.connect(mongoUrl);

const server = http.createServer(app);

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
