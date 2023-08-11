const { checkType } = require('../helpers/checkType');
module.exports = () => (req, res, next) => {
  /*
  The outer loop iterates over each key in the req.body object.
  Inside the loop, if the value associated with the key is a string,
  leading and trailing whitespace are removed using the trim() method.
  */
  for (let key in req.body) {
    if (typeof req.body[key] == 'string') {
      req.body[key] = req.body[key].trim();
    }

    /*
    If the value is determined to be an object by calling the checkType
    function, an inner loop is used to iterate over each property in the object.
    Within the inner loop, if a property value is a string, the leading and trailing whitespace are removed.
    */
    if (checkType(req.body[key]) === 'object') {
      for (const item in req.body[key]) {
        if (typeof req.body[key][item] == 'string') {
          req.body[key][item] = req.body[key][item].trim();
        }
      }
    }
  }

  next();
};
