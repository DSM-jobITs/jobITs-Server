const express = require('express');
const router = express.Router();
const { badRequest } = require('../errors');

const Notices = require('../models/notice');
const NoticeService = require('../services/notice');
const noticeService = new NoticeService(Notices);

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page);
  if (isNaN(page)) {
    return res.status(badRequest.status).send({
      message: badRequest.message
    });
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.query.id);
  if (isNaN(id)) {
    return res.status(badRequest.status).send({
      message: badRequest.message
    });
  }

  try {
    const result = await noticeService.getOneNotice(id);
    res.send(result);
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
});

router.post('/',  async (req, res) => {
  try {
    if (!Object.keys(req.fields).length) {
      throw badRequest;
    }

    const { title, content } = req.fields;
    if (req.fields.fixed !== 'false' && req.fields.fixed !== 'true') {
      throw badRequest;
    }
    const fixed = (req.fields.fixed !== 'false');
    const fileNames = await noticeService.integrateFileNames(req.files.files);

    const noticeId = await noticeService.createNotice(title, content, fileNames, fixed);    
    res.status(201).send({
      id: noticeId
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
});

module.exports = router;