

// custom Class for new custom errors
class CustomAPIError extends Error
{
  constructor(message)
  {
    super(message)
  }
}

module.exports = CustomAPIError;
