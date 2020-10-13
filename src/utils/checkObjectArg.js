function isObject(object) {
  return object.constructor === Object;
}

function isEmptyObject(object) {
  return !Object.keys(object).length;
}

function isNotObjectArg(object) {
  return !isObject() || isEmptyObject(object);
}

module.exports = isNotObjectArg;