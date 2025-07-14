require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({
  store: new MemoryStore(),
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.engine('hbs', handlebars.engine({
  extname: 'hbs',
  helpers: {},
  defaultLayout: 'layout',
  layoutsDir: './src/view/layouts',
  partialsDir: './src/view/partials',
}));
app.set('view engine', 'hbs');
app.set('views', './src/view');

app.use('/api', require('./api/api.route'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
