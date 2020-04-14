
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', (req, res) => {
  console.log('Got /!');
  res.send('Congratulations! Your Node application on Cloud Run is now LIVE and ready to receive events.');
});

app.post('/', (req, res) => {
  console.log('Event received!');

  console.warn('HEADERS:');
  console.warn(JSON.stringify(req.headers));

  console.warn('BODY:');
  console.warn(JSON.stringify(req.body));

  res.send(req.headers);
});

app.listen(port, () => {
  console.log('App listening on port', port);
});

