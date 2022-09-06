const express = require("express");
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require("express");

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/options', async (req, res) => {
  if (!req.query || !req.query.sku) {
    return res.status(400).send('SKU ID is required');
  }
  const please = await axios.get(`https://m2-dev-controllermodz.aqeltech.com/rest/V1/products/${req.query.sku}/options`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer 7qcul86v2eqvursm9a60ecgk8g9ofz5m',
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
      "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
    }
  });
  res.send(please.data);
});

app.get('/test', (req, res) => {
  (async () => {
    // Hello.
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
    res.send(please.data);
  })();
});

app.get('/get_quote_id', async (req, res) => {
    const please = await axios.post(`https://m2-dev-controllermodz.aqeltech.com/rest/V1/guest-carts`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
      }
    });
    res.send(please.data.toString());
});

app.post('/add_product', async(req, res) => {
  try
  {
    const please = await axios.post(`https://m2-dev-controllermodz.aqeltech.com/rest/V1/guest-carts/${req.body.cart_item.quote_id}/items`, req.body, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
      }
    });
    res.send(please.data);
  }
  catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }

});


app.get('/get_xbox_options', (req, res) => {
  (async () => {
    const please = await axios.get(`https://m2-dev-controllermodz.aqeltech.com/rest/V1/products/byoxbx/options`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer 7qcul86v2eqvursm9a60ecgk8g9ofz5m',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
      }
    });
    res.send(please.data);
  })();
});



app.listen(process.env.PORT || 5000, () => console.log("Server is running on 5000"));
