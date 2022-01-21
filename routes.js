// import endpoints (api)
const helloworld = require('./api/helloworld');
const note = require('./api/note');
const user = require('./api/user');
const authLocal = require('./auth/local');
const upload = require('./api/upload');

// defining routes
function routes(app) {
  app.use('/api/notes', note);
  app.use('/api/helloworld', helloworld);
  app.use('/api/users', user);
  app.use('/api/auth', authLocal);

  app.use('/api/uploads', upload);
}

module.exports = routes;
