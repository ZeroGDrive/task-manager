if (process.env.NODE_ENV === 'production') {
  //we are in production - return the production set of keys
  module.exports = require('./prod');
} else {
  if (process.env.NODE_ENV === 'test') {
    module.exports = require('./test');
  } else {
    // we are in development - return the dev set of keys
    module.exports = require('./dev');
  }
}
