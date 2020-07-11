const express = require('express');

const auth = require('./server/auth/route');
const user = require('./server/user/route');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', auth);
router.use('/user', user);


module.exports = router;
