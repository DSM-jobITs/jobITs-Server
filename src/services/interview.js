class InterviewService {
  constructor(interviewModel) {
    this.interviewModel = interviewModel;
  }

  async getAllFieldQuestions(page, maxShow) {
    const results = await this.interviewModel.findAll({
      limit: maxShow,
      offset: page - 1
    });

    results.forEach((result) => {
      result['createdAt'] = result['createdAt'].toFormat('YYYY-MM-DD');
    });

    return results;
  }
}

module.exports = InterviewService;