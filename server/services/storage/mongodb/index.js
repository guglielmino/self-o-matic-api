'use strict';

var mongoose = require('mongoose'),
  chalk = require('chalk');

var MongoDBProvider = function(config) {
  
  if (!config.mongo) {
    var err = new Error('Missing MongoDB configuration');
    throw err;
  }

  mongoose.connect(config.mongo.uri);

  this.db = mongoose.connection;
  
  this.db.on('error', console.error.bind(console, 'connection error:'));
  this.db.once('open', function () {
      console.log(chalk.green("DB CONNNECTED"));
  });

  
};

MongoDBProvider.prototype = {

  machinesProvider: function() {
    var MachinesProvider = require('./machines-provider')
    return new MachinesProvider(this.db);
  }
};

module.exports = MongoDBProvider;