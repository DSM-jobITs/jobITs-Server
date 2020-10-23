const { Notices, FileMappings } = require('../../models');
const NoticeService = require('../../services/notice');
const noticeService = new NoticeService(Notices, FileMappings);

const { badRequest } = require('../../errors');

const getNoticeList = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    if (isNaN(page)) {
      throw badRequest;
    }
    const maxShow = 6;  // 한 페이지에 보이는 게시물 수 고정
    
    const lists = await noticeService.getNotices(page, maxShow);
    res.send({
      lists: lists
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const getNotice = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw badRequest;
    }

    const result = await noticeService.getOneNotice(id);
    res.send(result);
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const registerNotice = async (req, res) => {
  try {
    if (!Object.keys(req.fields).length) {
      throw badRequest;
    }
    const { title, content } = req.fields;
    
    if (req.fields.fixed !== 'false' && req.fields.fixed !== 'true') {
      throw badRequest;
    }
    const fixed = (req.fields.fixed !== 'false');

    const noticeId = await noticeService.createNotice(title, content, fixed);
    await noticeService.uploadFiles(noticeId, req.files.files);

    res.status(201).send({
      id: noticeId
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const updateNotice = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw badRequest;
    }
    if (!Object.keys(req.fields).length) {
      throw badRequest;
    }
    if (req.fields.fixed !== 'false' && req.fields.fixed !== 'true') {
      throw badRequest;
    }
    const { title, content } = req.fields;
    const fixed = (req.fields.fixed !== 'false');

    await noticeService.updateNotice(id, title, content, fixed, req.files.files);
    res.send();
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const removeNotice = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw badRequest;
    }

    await noticeService.deleteNotice(id);
    res.send();
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

module.exports = {
  getNoticeList,
  getNotice,
  registerNotice,
  updateNotice,
  removeNotice
};