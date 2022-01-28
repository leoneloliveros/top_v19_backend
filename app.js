const express = require('express');

const expressConfig = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');

const swaggerDocs = require('./config/swagger');

const app = express();

expressConfig(app);

const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
  // connect to database

  connectDB();

  // Routes
  routes(app);

  // Swagger
  swaggerDocs(app, PORT);

  console.log(`Server running 🤖 at http://localhost:${PORT}/`);
});

module.exports = app;
