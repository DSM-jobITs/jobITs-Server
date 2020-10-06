const path = require('path');
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
      cb(null, Date.now().toString + extension);
    },
    acl: 'public-read'
  })
});

class FileService {
  constructor() {
    this.upload = upload;
  }

  uploadFiles(files) {
    files.forEach((file) => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: file.key,
        Body: file.location,
        ACL: 'public-read'
      };

      s3.upload(params, (error, data) => {
        if (error) {
          error.status = 500;
          throw error;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    });
  }
}

module.exports = FileService;