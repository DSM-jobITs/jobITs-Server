class HttpError extends Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const badRequest = new HttpError(400, '올바르지 않은 요청입니다.');

module.exports = {
  badRequest
};