const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const path = require('path');

const { version } = require('../package.json');

const routesApi = path.join(__dirname, '../api/**/index.js');
const schemasApi = path.join(__dirname, '../api/**/**.schema.js');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Top v19 Backend for notes',
      version,
      description: 'Esto Api documentacion para desarrolladores de MIR',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Leonel oliveros',
        url: 'https://github.com/leoneloliveros',
        email: 'leoneloliveros.co@gmail.com',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local Server',
      }, // http://localhost:8080
      {
        url: 'https://top-v19-backend.herokuapp.com/',
        description: 'Heroku testing server',
      }, //qa https://qa.makeitreal.camp
    ],
  },
  apis: [routesApi, schemasApi],
};

const swaggerSpec = swaggerJsDoc(options);

// levantar nuestro servidor

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger is running 🤖 at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
