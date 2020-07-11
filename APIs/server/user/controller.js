const User = require('./model');

function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; 
      return next();
    })
    .catch(e => next(e));
}

function create(req, res, next) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  user.save().then(savedLead => {
      res.json(savedLead)
    }).catch(e => next(e));
}

function test(req, res, next){

}

module.exports = { load, test, create };
