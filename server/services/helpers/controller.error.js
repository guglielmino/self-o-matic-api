'use strict';

var errorStatuses = {
	'KeyViolation' : 304,
	'ValidationError': 400
};

exports.errorCodeToStatus = function (statusCode) {
	var res = 500;

	if (statusCode in errorStatuses) {
		res = errorStatuses[statusCode];
	}

	return res;
}

