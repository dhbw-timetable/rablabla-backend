const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  app.listen(process.env.PORT || 10010);

  console.log('RABLABLA ONLINE');
});
