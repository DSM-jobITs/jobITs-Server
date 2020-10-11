const FileService = require('./file');
const { badRequest, notFound } = require('../errors');
const { BUCKET_URL } = require('../config');
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
    const result = await this.noticeModel.findOne({
      attributes: ['title', 'content', 'file', 'createdAt'],
      where: { id: id }
    });

    if (!result) {
      throw notFound;
    }

    result.createdAt = result.createdAt.toFormat('YYYY-MM-DD');
    result.file = result.file.split('-');
    for(let i = 0; i < result.file.length; i++) {
      result.file[i] = BUCKET_URL + result.file[i];
    }
    return result;
  }

  async getNotices(page) {
    if (!isNotEmpty()) {
      throw notFound;
    }
  }
}

module.exports = NoticeService;