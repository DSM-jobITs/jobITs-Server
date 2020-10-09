const path = require('path');
const makeUuid = require('../utils/makeUuid');
const { badRequest } = require('../errors');
// const multer = require('multer');
// const multerS3 = require('multer-s3');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');

const { BUCKET_NAME } = require('../config');
const s3 = new AWS.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       const extension = path.extname(file.originalname);
//       cb(null, Date.now().toString() + extension);
//     },
//     acl: 'public-read'
//   })
// });

class FileService {
  makeFileKey(file) {
    if (!file) {
      throw badRequest;
    }

    const extension = path.extname(file.name);
    const uuid = makeUuid();
    return uuid + extension;
  }

  async uploadFiles(files) {
    if (!files.length) {
      return [null];
    }

    let fileLocationArray = [];
    
    

    // files.forEach((file) => {
    //   const params = {
    //     Bucket: BUCKET_NAME,
    //     Key: this.makeFileKey(file),
    //     Body: file.path,
    //     ACL: 'public-read'
    //   };

    //   s3.upload(params, (error, data) => {
    //     if (error) {
    //       error.status = 500;
    //       throw error;
    //     }
    //     console.log('s3.upload', data);
    //     fileLocationArray.push(data.Location);
    //   });
    // });
  }
}

module.exports = FileService;