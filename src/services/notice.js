const FileService = require('./file');
const { badRequest, notFound } = require('../errors');
const isStoredNotice = require('../utils/isStoredNotice');
const isNotEmpty = require('../utils/isNotEmpty');
require('date-utils');

class NoticeService extends FileService {
  constructor(noticeModel) {
    super();
    this.noticeModel = noticeModel;
  }

  async createNotice(title, content, fileNames, fixed) {
    if ((typeof title !== 'string') || (typeof content !== 'string') || (typeof fixed !== 'boolean')) {
      throw badRequest;
    }

    const result = await this.noticeModel.create({
      title: title,
      content: content,
      file: fileNames,
      fixed: fixed
    });

    return result['id'];
  }

  async getOneNotice(id) {
    // check id was stored in database
    if (!await isStoredNotice(id)) {
      throw notFound;
    }

    const result = await this.noticeModel.findOne({
      attributes: ['title', 'content', 'file', 'createdAt'],
      where: { id: id }
    });
    
    result.file = result.file.split('-');
    result.createdAt = result.createdAt.toFormat('YYYY-MM-DD');
    return result;
  }

  async getNotices(page) {
    if (!isNotEmpty()) {
      throw notFound;
    }
  }
}

module.exports = NoticeService;