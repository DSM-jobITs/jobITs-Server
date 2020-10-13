const path = require('path');
const makeUuid = require('../utils/makeUuid');
const { badRequest } = require('../errors');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');
const { BUCKET_NAME, BUCKET_URL } = require('../config');
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
    if (!files[0] || typeof files[0] !== 'string') {
      return null;
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

  // async deleteFiles(files) {
  //   const objects = [];
  //   for (let i = 0; i < files.length; i++) {
  //     objects.push({
  //       Key: files[i].replace(BUCKET_URL, '')
  //     });
  //   }

  //   const params = {
  //     Bucket: BUCKET_NAME,
  //     Delete: {
  //       Objects: objects,
  //         Quiet: false
  //     }
  //   };
  //   await s3.deleteObjects(params).promise();
  // }
}

module.exports = FileService;