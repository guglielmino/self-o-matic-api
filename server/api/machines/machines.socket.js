'use strict';

var self;

var MachineSocketioController = function(socketio)  {
	this.sock = socketio;

	self = this;
};


MachineSocketioController.prototype.notifyConfigUpdate = function(serial, newConfig){
	// TODO: Va gestito l'update alla sola macchina che lo neessita
	
	self.sock.sendTo(serial, 'config_update', newConfig);
	//self.sock.sendBroadcast('config_update', newConfig);
};

module.exports = MachineSocketioController;
