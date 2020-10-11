const FileService = require('./file');
const { badRequest, notFound } = require('../errors');
const { BUCKET_URL } = require('../config');
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
    const notice = await this.noticeModel.findOne({
      attributes: ['title', 'content', 'file', 'createdAt'],
      where: { id: id }
    });

    if (!notice) {
      throw notFound;
    }

    notice.createdAt = notice.createdAt.toFormat('YYYY-MM-DD');
    notice.file = notice.file.split('-');
    for(let i = 0; i < notice.file.length; i++) {
      notice.file[i] = BUCKET_URL + notice.file[i];
    }
    return notice;
  }

  async getNotices(page) {
    if (page < 1) {
      throw badRequest;
    }

    // 페이지네이션 10개로 고정해 둔 상황
    const lists =  await this.noticeModel.findAll({
      attributes: ['title', 'createdAt'],
      offset: (page - 1) * 10,
      limit: 10
    });

    if (!lists.length) {
      throw notFound;
    }
    for (let i = 0; i < lists.length; i++) {
      lists[i].createdAt = lists[i].createdAt.toFormat('YYYY-MM-DD');
    }
    return lists;
  }

  async deleteNotice(id) {
    const notice = await this.getOneNotice(id);
    await this.deleteFiles(notice.file);
    await this.noticeModel.destory({
      where: { id: id }
    });
  }
}

module.exports = NoticeService;