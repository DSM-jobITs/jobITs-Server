const express = require('express');
const router = express.Router();
const { badRequest } = require('../errors');

const Notices = require('../models/notice');
const NoticeService = require('../services/notice');
const noticeService = new NoticeService(Notices);

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await noticeService.getOneNotice(id);
    res.send(result);
  } catch (error) {
    // res.status(error.status).send({
    //   message: error.message
    // });
    console.error(error);
  }
});

router.post('/',  async (req, res) => {
  if (!Object.keys(req.fields).length) {
    return res.status(badRequest.status).send({
      message: badRequest.message
    });
  }

  try {
    const { title, content } = req.fields;
    const fixed = (req.fields.fixed !== 'false');
    const files = await noticeService.uploadFiles(req.files.files);

    await noticeService.createNotice(title, content, files, fixed);    
    res.status(201).send({ message: '성공적으로 등록되었습니다.' });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
});

module.exports = router;