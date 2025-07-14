const router = require('express').Router();
const ApiController = require('../controller/api.controller');
const { authWithSession, authWithToken } = require('../middleware/auth.middleware');

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.post('/logout', ApiController.logout);

router.get('/protected', authWithSession, (req, res) => {
  res.json({ message: 'Protected route' });
});
router.get('/protected-token', authWithToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

module.exports = router;
