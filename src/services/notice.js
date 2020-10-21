const FileService = require('./file');
const { badRequest, notFound } = require('../errors');
const { BUCKET_URL } = require('../config');
const { MAX_TITLE_LEN, MAX_CONTENT_LEN } = require('../models/notice');
const isStored = require('../utils/isStored');
require('date-utils');

class NoticeService extends FileService {
  constructor(noticeModel, fileMappingModel) {
    super(fileMappingModel);
    this.noticeModel = noticeModel;
  }

  async createNotice(title, content, fixed) {
    if (typeof title !== 'string' || !title || title.length > MAX_TITLE_LEN) {
      throw badRequest;
    }
    if (typeof content !== 'string' || !content || content.length > MAX_CONTENT_LEN) {
      throw badRequest;
    }
    if (typeof fixed !== 'boolean') {
      throw badRequest;
    }

    const result = await this.noticeModel.create({
      title: title,
      content: content,
      fixed: fixed
    });

    return result['id'];
  }

  async getOneNotice(id) {
    const notice = await this.noticeModel.findOne({
      attributes: ['id', 'title', 'content', 'createdAt'],
      where: { id: id }
    });

    if (!notice) {
      throw notFound;
    }
    notice.createdAt = notice.createdAt.toFormat('YYYY-MM-DD');

    const files =  await this.getFiles(notice.id);
    for (const file of files) {
      file.url = BUCKET_URL + file.url;
    }

    delete notice.dataValues.id;
    notice.dataValues.files = files;
    return notice;
  }

  async getNotices(page, maxShow) {
    if (typeof page !== 'number' || page < 1) {
      throw badRequest;
    }
    if (typeof maxShow !== 'number' || maxShow < 1) {
      throw badRequest;
    }

    const lists =  await this.noticeModel.findAll({
      attributes: ['title', 'createdAt'],
      order: [
        ['fixed', 'DESC']
      ],
      offset: (page - 1) * maxShow,
      limit: maxShow
    });

    if (!lists.length) {
      throw notFound;
    }
    for (let i = 0; i < lists.length; i++) {
      lists[i].createdAt = lists[i].createdAt.toFormat('YYYY-MM-DD');
    }
    return lists;
  }

  async updateNotice(noticeId, title, content, fixed, files) {
    if (typeof noticeId !== 'number' || noticeId < 1) {
      throw badRequest;
    }
    if (typeof title !== 'string' || !title || title.length > MAX_TITLE_LEN) {
      throw badRequest;
    }
    if (typeof content !== 'string' || !content || content.length > MAX_CONTENT_LEN) {
      throw badRequest;
    }
    if (typeof fixed !== 'boolean') {
      throw badRequest;
    }
    if (!await isStored(noticeId)) {
      throw notFound;
    }

    await this.deleteNotice(noticeId);
    await this.noticeModel.create({
      id: noticeId,
      title: title,
      content: content,
      fixed: fixed
    });
    await this.uploadFiles(files);
  }

  async deleteNotice(noticeId) {
    if (typeof noticeId !== 'number' || noticeId < 1) {
      throw badRequest;
    }
    if (!await isStored(noticeId)) {
      throw notFound;
    }
    await this.deleteFiles(noticeId);
    await this.noticeModel.destroy({
      where: { id: noticeId }
    });
  }
}

module.exports = NoticeService;