'use strict';

var Q = require('q');
var _ = require('lodash');
var User = require('./models/user');
var errorHandler = require('./error.handler');

var AuthHelper = require('../../../services/helpers/auth.helper');
var authHelper = new AuthHelper();

var UsersProvider = function(db) {
  this.db = db;
};

UsersProvider.prototype.findById = function(userId) {
  var deferred = Q.defer();

  User.findById(userId, function (err, user) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(user);
    }
  });

  return deferred.promise;
};

UsersProvider.prototype.findOne = function(filter) {
  var deferred = Q.defer();
  var query  = User.where(filter);
  query.findOne(function (err, user) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else {
      deferred.resolve(user);
    }
  });
  return deferred.promise;
};


UsersProvider.prototype.find = function(filter) {
  var deferred = Q.defer();

  User.find(filter, function (err, users) {
    if (err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(users);
    }
  });

  return deferred.promise;
};

UsersProvider.prototype.create = function(userData) {
  var deferred = Q.defer();
  var user = new User(userData);

  user.provider = 'local';
  user.role = 'user';

  user.salt = authHelper.makeSalt();
  user.hashedPassword = authHelper.encryptPassword(user.salt, user.password);

  user.save(function (err) {
    if (err) {
      // TODO: in caso di errore di validazione l'errore tornato è un ValidationError
      //       senza code. 
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(user);
    }
  });
  return deferred.promise;
};

UsersProvider.prototype.delById = function(userId) {
  console.log("DELETE " + userId);
  console.log("STACK " +  console.trace());
  
  var deferred = Q.defer();
  User.findByIdAndRemove(userId, function(err, user) {
    if(err) {
      deferred.reject(errorHandler.getDecodedError(err));
    }
    else{
      deferred.resolve(user);
    }
  });
  return deferred.promise;
};



module.exports = UsersProvider;