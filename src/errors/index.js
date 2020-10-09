class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const badRequest = new HttpError(400, '올바르지 않은 요청입니다.');
const notFound = new HttpError(404, '게시물이 존재하지 않습니다.');

module.exports = {
  badRequest,
  notFound
};