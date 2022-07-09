const express = require("express");
const axios = require("axios");

const app = express();

app.use("/", require("./routes/routes"));

app.listen(4545, () => console.log("Server is running on 5000"));
