const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/test', (req, res) => {
  (async () => {
    const please = await axios.get(`https://m2-dev-controllermodz.aqeltech.com/rest/V1/products/byops5/options`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer 7qcul86v2eqvursm9a60ecgk8g9ofz5m',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
      }
    });
    res.json(please.data);
  })();
});

app.listen(process.env.PORT || 5000, () => console.log("Server is running on 5000"));
