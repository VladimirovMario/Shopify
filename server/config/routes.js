const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const dataController = require('../controllers/dataController');
const gameController = require('../controllers/gameController');
const homeController = require('../controllers/homeController');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'REST service operational' });
  });

  app.use('/api/', homeController);
  app.use('/api/user', authController);
  app.use('/api/game', gameController);
  app.use('/api/catalog', dataController);
  app.use('/api/comments', commentController);
};
