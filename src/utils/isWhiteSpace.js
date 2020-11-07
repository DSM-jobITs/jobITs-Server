function isWhiteSpace(string) {
  const isWhiteSpace = /^\s*$/;
  return isWhiteSpace.test(string);
};

module.exports = isWhiteSpace;