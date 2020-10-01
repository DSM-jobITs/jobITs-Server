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
}

module.exports = InterviewService;