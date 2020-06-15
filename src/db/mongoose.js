const mongoose = require('mongoose');
const keys = require('../../config/keys');

mongoose.connect(keys.mongodbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
