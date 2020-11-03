const { badRequest, notFound } = require('../errors');

class EmployeRecordService {
  constructor(employeRecordModel) {
    this.employeRecordModel = employeRecordModel;
  }


  async getTotalEmployed(companyId) {
    if (typeof companyId !== 'number' || companyId < 1) {
      throw badRequest;
    }

    const totalEmployed = await this.employeRecordModel.sum('num_of_employed', {
      where: { company_id: companyId }
    });
    if (!totalEmployed) {
      throw notFound;
    }

    return totalEmployed;
  }

  async getEmployedPeopleList(companyId) {
    if (typeof companyId !== 'number' || companyId < 1) {
      throw badRequest;
    }

    const employePeopleList = await this.employeRecordModel.findAll({
      attributes: ['id', 'year', ['num_of_employed', 'numOfEmployed']],
      where: { company_id: companyId },
      order: [
        ['year', 'DESC']
      ]
    });

    if (!employePeopleList) {
      throw notFound;
    }
    return employePeopleList;
  }
}

module.exports = EmployeRecordService;