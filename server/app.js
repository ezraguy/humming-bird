const users = require('./routes/users');
const auth = require('./routes/auth');
const cards = require('./routes/cards');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require('cors');



mongoose.connect('mongodb://localhost/hummingbird', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', cards);
const port = 3001;



http.listen(port, () => console.log(`Listening on port ${port}...`));