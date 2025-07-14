const router = require('express').Router();
const ApiController = require('../controller/api.controller');

router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);
router.post('/logout', ApiController.logout);

module.exports = router;
