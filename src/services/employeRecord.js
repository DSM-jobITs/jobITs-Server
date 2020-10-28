const { badRequest, notFound } = require("../errors");

class EmployeRecordService {
  constructor(employeRecordModel) {
    this.employeRecordModel = employeRecordModel;
  }


  async getTotalEmployed(companyId) {
    if (typeof companyId !== 'number' || companyId < 1) {
      throw badRequest;
    }

    const totalEmployed = await this.employeRecordModel.count({
      where: { company_id: companyId }
    });
    if (!totalEmployed) {
      throw notFound;
    }

    return totalEmployed;
  }

  async getEmployePeopleList(companyId) {
    if (typeof companyId !== 'number' || companyId < 1) {
      throw badRequest;
    }

    const employePeopleList = await this.employeRecordModel.findAll({
      attributes: ['year', 'num_of_employed'],
      where: { company_id: companyId }
    });

    if (!employePeopleList) {
      throw notFound;
    }
    return employePeopleList;
  }
}

module.exports = EmployeRecordService;