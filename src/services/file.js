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

  async integrateFileNames(files) {
    if (!Array.isArray(files)) {
      files = [files];
    }
    const result = await this.uploadFiles(files);
    if (!result) {
      return result;
    }
    
    let index = 0;
    let fileNames = result[index++].toString();

    while (index < result.length) {
      fileNames = fileNames + '-' + result[index++].toString();
    }

    return fileNames;
  }

  async uploadFiles(files) {
    if (!Object.keys(files).length) {
      return [null];
    }

    const fileNameArray = [];
    
    for (const file of files) {
      const params = {
        Bucket: BUCKET_NAME,
        Key: this.makeFileKey(file),
        Body: file.path,
        ACL: 'public-read'
      }
      const data = await s3.upload(params).promise();
      fileNameArray.push(data.key);
    }

    return fileNameArray;
  }
}

module.exports = FileService;