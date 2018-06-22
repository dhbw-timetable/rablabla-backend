const SwaggerExpress = require('swagger-express-mw');
const cors = require('cors');
const app = require('express')();

const corsOptions = {
  origin: 'https://rablabla.m320trololol.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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

  const port = process.env.PORT || 10010;
  app.listen(port);

  console.log('RABLABLA ONLINE');
});
