const express = require('express');
const router = express.Router();

const Notices = require('../models/notice');
const NoticeService = require('../services/notice');
const noticeService = new NoticeService(Notices);

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');

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
})

router.post('/', upload.array('test'), (req, res) => {
  req.files.forEach((file) => {
    console.log(file);
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.key,
      Body: file.location,
      ACL: 'public-read'
    };
    s3.upload(params, (error, data) => {
      if (error) {
        throw error;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
    });
  });
  res.send('');
});

module.exports = router;