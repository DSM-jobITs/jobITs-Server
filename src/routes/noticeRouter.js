const express = require('express');

const Notices = require('../models/notice');
const NoticeService = require('../services/notice');
const noticeService = new NoticeService(Notices);

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, 'uploads/images');
    } else if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, 'uploads/texts');
    } else {
      console.log(file.mimetype);
      cb({ error: 'Mime type not supported!' });
    }
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.array('test'), async (req, res) => {
  req.files.forEach((file) => {
    console.log(file);
  });
  res.send('Success');
});

module.exports = router;