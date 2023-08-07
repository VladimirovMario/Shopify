const express = require('express');
const dotenv = require('dotenv').config();
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const bodyParser = require('body-parser');

const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');

start();

async function start() {
  const app = express();
  await databaseConfig(app);

  app.use(bodyParser.json({ limit: '10mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());

  routesConfig(app);

  const port = process.env.PORT || 3030;
  app.listen(port, () =>
    console.log(`You can make requests to: \nhttp://localhost:${port}/api`)
  );
}
