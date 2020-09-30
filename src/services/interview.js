class InterviewService {
  constructor(interviewModel) {
    this.interviewModel = interviewModel;
  }

  async getAllFieldQuestions(page, maxShow) {
    return await this.interviewModel.findAll({
      limit: maxShow,
      offset: page - 1
    });
  }
}

module.exports = InterviewService;