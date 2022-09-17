const express = require("express");
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require("express");
const fs = require('fs');
const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    const arrData = []
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        arrData.push({filename, content})
        if (arrData.length === filenames.length)
        {
          onFileContent('filename', arrData);
        }
      });
    });
  });
}

app.get('/assets', async (req, res) => {
  if (!req.query || !req.query.sku) {
    return res.status(400).send('SKU ID is required');
  }
  readFiles('./assets/', function(filename, content) {
    res.send({data: content});
  }, function(err) {
    res.status(500).json({error: 'Ha Ocurrido un error'});
    throw err;
  });
});

app.get('/options', async (req, res) => {
  if (!req.query || !req.query.sku) {
    return res.status(400).send('SKU ID is required');
  }
  const please = await axios.get(`https://dev.controllermodz.co.uk/rest/V1/products/${req.query.sku}/options`, {
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

app.get('/get_estimated_delivery', async (req, res) => {
  if (!req.query || !req.query.product_id) {
    return res.status(400).send('SKU ID is required');
  }
  const please = await axios.get(`https://dev.controllermodz.co.uk/estimateddeliverydate/message/update/id/${req.query.product_id}`, {
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
    const please = await axios.get(`https://dev.controllermodz.co.uk/rest/V1/products/byops5/options`, {
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

app.get('/get_product', async (req, res) => {
  if (!req.query || !req.query.quoteId) {
    return res.status(400).send('quoteId is required');
  }
  const please = await axios.get(`https://dev.controllermodz.co.uk/rest/V1/guest-carts/${req.query.quoteId}/items`, {
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

app.get('/get_quote_id', async (req, res) => {
  const createCart = await axios.post(`https://dev.controllermodz.co.uk/rest/V1/guest-carts`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
      "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
    }
  });
  res.send(createCart.data.toString());
  // if (createCart.data.toString() !== '')
  // {
  //   const getQuoteId = await axios.get(`https://dev.controllermodz.co.uk/rest/V1/guest-carts/${createCart.data.toString()}`, {
  //     headers: {
  //       'Content-Type': 'application/json;charset=UTF-8',
  //       'Authorization': 'Bearer 7qcul86v2eqvursm9a60ecgk8g9ofz5m',
  //       "Access-Control-Allow-Origin": '*',
  //       "Access-Control-Allow-Credentials": true,
  //       "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
  //       "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"
  //     }
  //   });
  //   res.send({quote_id: createCart.data.toString(), cartData: getQuoteId.data});
  // }
  // else
  // {
  //   res.send({
  //     success: false,
  //     message: 'Wrong when creating Cart'
  //   });
  // }
});
app.post('/update_product', async(req, res) => {
  try
  {
    const please = await axios.put(`https://dev.controllermodz.co.uk/rest/V1/guest-carts/${req.body.cartItem.quoteId}/items/${req.body.itemId}`, {
      cartItem: req.body.cartItem
    }, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer 7qcul86v2eqvursm9a60ecgk8g9ofz5m',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT",
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

app.post('/add_product', async(req, res) => {
  try
  {
    const please = await axios.post(`https://dev.controllermodz.co.uk/rest/V1/guest-carts/${req.body.cartItem.quoteId}/items`, {
      cartItem: req.body.cartItem
    }, {
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
    const please = await axios.get(`https://dev.controllermodz.co.uk/rest/V1/products/byoxbx/options`, {
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
