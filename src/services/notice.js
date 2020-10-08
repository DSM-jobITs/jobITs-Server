const FileService = require('./file');
const { badRequest } = require('../errors');

class NoticeService extends FileService {
  constructor(noticeModel) {
    this.noticeModel = noticeModel;
  }

  async createNotice(title, content, files, fixed) {
    if (!title || !content || !fixed) {
      throw badRequest;
    }
    
    files.forEach((file) => {
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