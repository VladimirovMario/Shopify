function checkType(o) {
  return Object.prototype.toString
    .call(o)
    .replace(/\[|object\s|\]/g, '')
    .toLowerCase();
}

module.exports = {
  checkType,
};

// You can use it very simply:
/*
checkType([]) === 'array'; // true
checkType({}) === 'object'; // true
checkType(1) === 'number'; // true
checkType('') === 'string'; // true
checkType({}.p) === 'undefined'; // true
checkType(null) === 'null'; // true
*/
