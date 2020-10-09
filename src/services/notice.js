const FileService = require('./file');
const { badRequest, notFound } = require('../errors');
require('date-utils');

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

  async getOneNotice(id) {
    const result = await this.noticeModel.findOne({
      attributes: ['title', 'content', 'file', 'createdAt'],
      where: { id: id }
    });
    result.dataValues.files = [result.file];
    delete result.dataValues.file;

    for (let i = 1; i < await this.noticeModel.count({
      where: { createdAt: result.createdAt }
    }); i++) {
      const data = await this.noticeModel.findOne({
        attributes: ['file'],
        where: { createdAt: result.createdAt },
        offset: 1
      });

      if (result.dataValues.files.includes(data.file)) {
        throw notFound;
      }
      result.dataValues.files.push(data.file);
    }
    result.createdAt = result.createdAt.toFormat('YYYY-MM-DD');
    return result;
  }
}

module.exports = NoticeService;