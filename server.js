const express = require("express");
const axios = require("axios");

const app = express();

app.use("/", require("./routes/routes"));

app.listen(80, () => console.log("Server is running on 80"));
