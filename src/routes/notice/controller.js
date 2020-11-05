const { Notices, FileMappings } = require('../../models');
const NoticeService = require('../../services/notice');
const noticeService = new NoticeService(Notices, FileMappings);

const formidable = require('formidable');
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
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.multiples = true;
  try {
    form.parse(req, async (err, fields, files) => {
      if (!Object.keys(fields).length) {
        throw badRequest;
      }
      const { title, content } = fields;
      if (fields.fixed !== 'false' && fields.fixed !== 'true') {
        throw badRequest;
      }
      const fixed = (fields.fixed !== 'false');

      const noticeId = await noticeService.createNotice(title, content, fixed);
      await noticeService.uploadFiles(noticeId, files.files);
      
      res.status(201).send({
        id: noticeId
      });
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const updateNotice = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.multiples = true;
  form.parse(req, async (err, fields, files) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw badRequest;
      }
      if (!Object.keys(fields).length) {
        throw badRequest;
      }
      if (fields.fixed !== 'false' && fields.fixed !== 'true') {
        throw badRequest;
      }
      const { title, content } = fields;
      const fixed = (fields.fixed !== 'false');

      await noticeService.updateNotice(id, title, content, fixed, files.files);
      res.send();
    } catch (error) {
      res.status(error.status).send({
        message: error.message
      });
    }
  });
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
