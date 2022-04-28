const express = require('express')
const customer_data = require('./classify_customer_data.js');

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.write('checkout the endpoint /customer-data')
    res.end('\n successful');
});

app.get('/customer-data', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(customer_data.result, null, 4));
})

app.get('*', function(req, res){
    res.end('wrong endpoint. Go to /customer-data');
  });

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`);
});
