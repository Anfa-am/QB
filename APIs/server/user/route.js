const express = require('express');
const userCtrl = require('./controller');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/create/').get(userCtrl.create)

router.route('/:userId/like/').post(userCtrl.test);

router.param('userId', userCtrl.load);

module.exports = router;
