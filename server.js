const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use("/", require("./routes/routes"));


app.listen(process.env.PORT || 5000, () => console.log("Server is running on 5000"));