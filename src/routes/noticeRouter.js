const express = require('express');
const router = express.Router();
const { badRequest } = require('../errors');

const Notices = require('../models/notice');
const NoticeService = require('../services/notice');
const noticeService = new NoticeService(Notices);

const { BUCKET_NAME } = require('../config');
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read'
  })
});

router.post('/', upload.array('test'), async (req, res) => {
  if (!req.body) {
    return res.status(badRequest.status).send({
      message: badRequest.message
    });
  }
  
  try {
    const files = noticeService.uploadFiles(req.files);
    const { title, content, fixed } = req.body;
    
    await noticeService.createNotice(title, content, files, fixed);    
    res.status(201).send({ message: '성공적으로 등록되었습니다.' });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
});

module.exports = router;