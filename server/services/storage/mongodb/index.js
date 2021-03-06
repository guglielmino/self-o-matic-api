  'use strict';

  var mongoose = require('mongoose'),
    chalk = require('chalk');

  var MongoDBProvider = function(config) {

    if (!config.mongo) {
      var err = new Error('Missing MongoDB configuration');
      throw err;
    }

    console.log("MongoDB Uri " + config.mongo.uri);
    mongoose.connect(config.mongo.uri);

    this.db = mongoose.connection;

    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function() {

      // Drop database
      if (config.mongo.dropdb) {
        console.log(chalk.red("!!! DROPPING DATABASE !!!"));
        mongoose.connection.db.dropDatabase();
      }

      // Load test data
      if (config.mongo.seedTestData) {
        require('./seed');
      }
    });


  };

  MongoDBProvider.prototype = {

    machinesProvider: function() {
      var MachinesProvider = require('./machines-provider')
      return new MachinesProvider(this.db);
    },
    usersProvider: function() {
      var MachinesProvider = require('./users-provider')
      return new MachinesProvider(this.db);
    }
  };

  module.exports = MongoDBProvider;