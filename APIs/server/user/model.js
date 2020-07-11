const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

mongoose.plugin(schema => { schema.options.usePushEach = true });

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: false,
    default: ''
  },

  lastLogin: {
    type: String,
    required: true,
    default: Date.now()
  },

  profileId: {
    type: String,
    required: true
  },

  profilePicture: {
    type: String,
    required: false,
    default: null
  },

  authProvider: {
    type: String,
    required: true
  },

  deviceType: {
    type: String,
    required: true,
    default: 'n/a'
  }
});

UserSchema.method({

});

UserSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

module.exports = mongoose.model('User', UserSchema);
