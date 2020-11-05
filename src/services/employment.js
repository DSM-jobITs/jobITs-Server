const error = require('../errors');

class employmentService {
  constructor(employmentModel) {
    this.employmentModel = employmentModel;
  }

  async getEmploymentList() {
    console.log('getelmploymentlist in');
    const list = await this.employmentModel.findAll({
      attributes: ['id','question','answer'],
      order: [['createdAt','desc']]
    });

    if(!list.length) {
      throw error.notFound;
    }

    return list;
  }
  async write(question,answer) {
    if(typeof question !== 'string' || question.length < 1) {
      throw error.badRequest;
    }
    if(typeof answer !== 'string' || answer.length < 1) {
      throw error.badRequest;
    }
    await this.employmentModel.create({
      question,
      answer
    });
  }
  async modify(id,question,answer) {
    if(typeof id !== 'number') {
      throw error.badRequest;
    }
    if(typeof question !== 'string' || question.length < 1) {
      throw error.badRequest;
    }
    if(typeof answer !== 'string' || answer.length < 1) {
      throw error.badRequest;
    }
    await this.employmentModel.update({
      question,
      answer
    },{
      where: { id }
    });
  }
  async drop(id) {
    if(typeof id !== 'number') {
      throw error.badRequest;
    }
    await this.employmentModel.destroy({
      where: { id }
    });
  }

}

module.exports = employmentService;
