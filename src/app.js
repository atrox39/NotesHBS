require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  helpers: {},
  defaultLayout: 'layout',
  layoutsDir: './src/view/layouts',
  partialsDir: './src/view/partials',
}));
app.set('view engine', 'hbs');
app.set('views', './src/view');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
