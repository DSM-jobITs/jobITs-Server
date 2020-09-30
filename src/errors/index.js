class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;  // 상태 코드
  }
}

const badRequest = new HttpError(400, '올바르지 않은 요청입니다.');
const notFound = new HttpError(404, '게시물을 찾을 수 없습니다.');

module.exports = {
  badRequest,
  notFound
};