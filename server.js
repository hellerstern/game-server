const express = require("express");
const axios = require("axios");

const app = express();

app.use("/", require("./routes/routes"));

app.listen(4343, () => console.log("Server is running on 4343"));
