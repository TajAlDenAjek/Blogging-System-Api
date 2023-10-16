const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');


// not found custom error 404
class NotFoundError extends CustomAPIError
{
  constructor(message)
  {
    super(message);
    this.statusCode=StatusCodes.NOT_FOUND;
  }
}


module.exports=NotFoundError;
