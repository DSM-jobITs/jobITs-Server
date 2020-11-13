require('date-utils');
const { badRequest, notFound } = require('../errors');
const isWhiteSpace = require('../utils/isWhiteSpace');
const { Op } = require('sequelize');
const MAX_CONTENT_LEN = 150;

class InterviewService {
  constructor(interviewModel) {
    this.interviewModel = interviewModel;
  }

  async getInterviewQuestions(page, field, keyword, maxShow) {
    if (typeof page !== 'number' || page < 1) {
      throw badRequest;
    }
    if ((typeof field !== 'string' || !field) && field !== false) {
      throw badRequest;
    }
    if (typeof field === 'string' && isWhiteSpace(field)) {
      throw badRequest;
    }
    if (typeof keyword !== 'string') {
      throw badRequest;
    }
    if (typeof maxShow !== 'number' || maxShow < 1) {
      throw badRequest;
    }
    
    const results = await this.interviewModel.findAll({
      attributes: ['id', 'content', 'createdAt'],
      where: {
        field: field,
        content: {
          [Op.like]: '%' + keyword + '%'
        }
      },
      order: [
        ['id', 'DESC']
      ],
      limit: maxShow,
      offset: (page - 1) * maxShow
    });

    if (!results.length) {
      throw notFound;
    }

    results.forEach((result) => {
      result['createdAt'] = result['createdAt'].toFormat('YYYY-MM-DD');
    });

    return results;
  }

  async registerInterviewQuestions(content, field) {
    if (typeof content !== 'string' || !content || isWhiteSpace(content) ||content.length > MAX_CONTENT_LEN) {
      throw badRequest;
    }
    if (typeof field !== 'string' || !field || isWhiteSpace(field)) {
      throw badRequest;
    }

    await this.interviewModel.create({
      content: content,
      field: field,
      createdAt: new Date().toFormat('YYYY-MM-DD')
    });
  }

  async isStored(id) {
    const count = await this.interviewModel.count({
      where: { id: id }
    });
    return count ? true : false;
  }

  async modifyInterviewQuestion(id, content, field) {
    if (typeof id !== 'number' || id < 1) {
      throw badRequest;
    }
    if (typeof content !== 'string' || !content || isWhiteSpace(content) || content.length > MAX_CONTENT_LEN) {
      throw badRequest;
    }
    if (typeof field !== 'string' || !field || isWhiteSpace(field)) {
      throw badRequest;
    }

    if (!await this.isStored(id)) {
      throw notFound;
    }

    await this.interviewModel.update({
      content: content,
      field: field
    }, {
      where: { id: id }
    });
  }

  async removeInterviewQuestion(id) {
    if (typeof id !== 'number' || id < 1) {
      throw badRequest;
    }

    if (!await this.isStored(id)) {
      throw notFound;
    }

    await this.interviewModel.destroy({
      where: { id: id }
    });
  }

  async numOfInterviewQuestionsWithField(field, keyword) {
    return await this.interviewModel.count({
      where: {
        field: field,
        content: {
          [Op.like]: '%' + keyword + '%'
        }
      }
    });
  }
}

module.exports = InterviewService;