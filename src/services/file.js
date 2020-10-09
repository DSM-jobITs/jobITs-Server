const path = require('path');
const makeUuid = require('../utils/makeUuid');
const { badRequest } = require('../errors');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');
const { BUCKET_NAME } = require('../config');
const s3 = new AWS.S3();

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
    
    for (const file of files) {
      const params = {
        Bucket: BUCKET_NAME,
        Key: this.makeFileKey(file),
        Body: file.path,
        ACL: 'public-read'
      }
      const data = await s3.upload(params).promise();
      fileLocationArray.push(data.Location);
    }

    return fileLocationArray;
  }
}

module.exports = FileService;