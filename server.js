const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();


const allowlist = ['http://localhost:3000'];

    const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    let isExtensionAllowed = req.path.endsWith('.jpg');
    
    if (isDomainAllowed && isExtensionAllowed) {
      // Enable CORS for this request
      corsOptions = { origin: true }
    } else {
      // Disable CORS for this request
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  }

app.use(cors(corsOptionsDelegate));
  
app.use("/", require("./routes/routes"));
app.listen(process.env.PORT || 5000, () => console.log("Server is running on 5000"));
