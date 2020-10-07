const FileService = require('./file');

class NoticeService extends FileService {
  constructor(noticeModel) {
    this.noticeModel = noticeModel;
  }

  
}

module.exports = NoticeService;