const { badRequest, notFound } = require('../errors');

class InterviewService {
  constructor(interviewModel) {
    this.interviewModel = interviewModel;
  }

  async getInterviewQuestions(page, field, maxShow) {
    if (!page) {
      throw badRequest;
    }
    
    const results = await this.interviewModel.findAll({
      where: { field: field },
      limit: maxShow,
      offset: page - 1
    });

    if (!results.length) {
      throw notFound;
    }

    results.forEach((result) => {
      result['createdAt'] = result['createdAt'].toFormat('YYYY-MM-DD');
    });

    return results;
  }

  async registerInterviewQuestions(contents, field) {
    if (!questions.length || !field) {
      throw badRequest;
    }

    contents.forEach(async (content) => {
      await this.interviewModel.create({
        content: content,
        field: field
      });
    });
  }

  async isStored(id) {
    const count = await this.interviewModel.count({
      where: { id: id }
    });
    return count ? true : false;
  }

  async modifyInterviewQuestion(id, content, field) {
    if (!id || !content || !field) {
      throw badRequest;
    }

    if (!this.isStored(id)) {
      throw notFound;
    }

    await this.interviewModel.update({
      content: content,
      field: field
    }, {
      where: { id: id }
    });
  }
}

module.exports = InterviewService;