const path = require('path');
const makeUuid = require('../utils/makeUuid');
const { badRequest } = require('../errors');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../config/awsconfig.json');
const { BUCKET_NAME, BUCKET_URL } = require('../config');
const s3 = new AWS.S3();

class FileService {
  constructor(fileMappingModel) {
    this.fileMappingModel = fileMappingModel;
  }

  async getFiles(noticeId) {
    try {
      return await this.fileMappingModel.findAll({
        attributes: ['filename', ['uuid', 'url']],
        where: { noticeId: noticeId }
      });
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }

  makeFileKey(file) {
    if (!file) {
      throw badRequest;
    }

    const extension = path.extname(file.name);
    const uuid = makeUuid();
    return uuid + extension;
  }

  async InsertFileName(noticeId, originalName, fileName) {
    if (typeof noticeId !== 'number' || noticeId < 1) {
      throw badRequest;
    }
    if (typeof originalName !== 'string' || !originalName) {
      throw badRequest;
    }
    if (typeof fileName !== 'string' || !fileName) {
      throw badRequest;
    }

    await this.fileMappingModel.create({
      filename: originalName,
      uuid: fileName,
      noticeId: noticeId
    });
  }

  async uploadFiles(noticeId, files) {
    if (!Array.isArray(files)) {
      files = [files];
    }
    if (!files[0] || !Object.keys(files[0]).length) {
      return null;
    }

    for (const file of files) {
      const fileName = file.name;
      const fileUuid = this.makeFileKey(file);
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileUuid,
        Body: file.path,
        ACL: 'public-read'
      }
      await s3.upload(params).promise();
      await this.InsertFileName(noticeId, fileName, fileUuid);
    }
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