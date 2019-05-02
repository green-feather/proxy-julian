// require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// to pass the loader.io verification
// app.get('/loaderio-d10429cb800392bd42b087abc1827493/', (req, res) => {
//   let address = path.resolve(__dirname, '../loaderio-d10429cb800392bd42b087abc1827493.txt');
//   res.sendFile(address);
// });

app.use('/:stockId/', express.static(path.join(__dirname, './public')));

// const chartReq = axios.create({
//     baseURL: 'http://ec2-13-57-177-212.us-west-1.compute.amazonaws.com:2468/'
//   });
  
// app.get('/api/:stockId', (req, res) => {  
//   chartReq.get(`api/${req.params.stockId}`)
//   .then((response) => {
//     res.send(response.data);
//   })
// })

// const buyFormReq = axios.create({
//     baseURL: 'http://ec2-3-84-115-167.compute-1.amazonaws.com:8080/' 
// });

// app.get('/stocks/:query', (req, res) => {
//     buyFormReq.get(`stocks/${req.params.query}`)
//     .then((response) => {
//         res.send(response.data);
//     })
// })

/* BUYSELL COMPONENT ROUTE */
const buysell = axios.create({
  baseURL: 'http://ec2-54-92-189-222.compute-1.amazonaws.com'
});

app.get('/api/:stockId', (req, res) => {
  console.log('reached the api route on the proxy')
  buysell.get(`/api/stocks/${req.params.stockId}`)
    .then((response) => {
      res.send(response.data);
    })
})
console.log('reached something in the proxy')

app.listen(port, () => {
    console.log('Server is listening on port', port);
});

