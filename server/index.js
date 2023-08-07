const express = require('express');
const databaseConfig = require('./config/database');
const bodyParser = require('body-parser');

const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');

const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const gameController = require('./controllers/gameController');
const homeController = require('./controllers/homeController');
const commentController = require('./controllers/commentController');

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

  app.get('/', (req, res) => {
    res.json({ message: 'REST service operational' });
  });

  app.use('/api/', homeController);
  app.use('/api/user', authController);
  app.use('/api/game', gameController);
  app.use('/api/catalog', dataController);
  app.use('/api/comments', commentController);

  const port = process.env.PORT || 3030;
  app.listen(port, () =>
    console.log(`You can make requests to http://localhost:${port}/api`)
  );
}
