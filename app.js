const config = require('./utils/config')
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
// const morgan = require('morgan');
const personRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('Connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

// morgan.token('data', (req, res) => {return JSON.stringify(req.body);});

app.use(cors());
app.use(express.static(path.join(__dirname, '/Client/build')));
app.use(express.json());
app.use(middleware.requestLogger)
app.use('/api/persons', personRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


module.exports = app;
