const router = require('express').Router();
const ApiController = require('../controller/api.controller');
const { authWithSession, authWithToken } = require('../middleware/auth.middleware');

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.post('/logout', ApiController.logout);

router.get('/protected', authWithSession, ApiController.protected);
router.get('/protected-token', authWithToken, ApiController.protectedToken);

module.exports = router;
