const FileService = require('./file');
const { badRequest } = require('../errors');

class NoticeService extends FileService {
  constructor(noticeModel) {
    super();
    this.noticeModel = noticeModel;
  }

  async createNotice(title, content, files, fixed) {
    if (!title || !content || (typeof fixed !== 'boolean')) {
      throw badRequest;
    }

    files.forEach(async (file) => {
      await this.noticeModel.create({
        title: title,
        content: content,
        file: file,
        fixed: fixed
      });
    });

  }
}

module.exports = NoticeService;