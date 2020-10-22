class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;  // 상태 코드
  }
}

const badRequest = new HttpError(400, 'Invalid parameters supplied');
const notFound = new HttpError(404, 'Not found');

module.exports = {
  badRequest,
  notFound
};