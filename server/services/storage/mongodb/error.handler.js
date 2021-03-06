'user strict';

// Map MongoDB error to high level error
exports.getDecodedError = function (err) {
	var res  = { 'status' : 'Ok', 'message' : ''};

	if(err.errors) {
		res.status = 'ValidationError';
		for (var errKey in err.errors) {
  			res.message += err.errors[errKey];
		}
	}
	else{
		switch(err.code){
			case 11000:
				res.status = 'KeyViolation';
				res.message = 'Item already exist';
				break;
			default:
				res.status = 'GenericError';
				res.message = 'Something goes wrong';
		}
	}

	return res;	
}