const { badRequest, notFound } = require('../errors');
const EmployeRecordService = require('./employeRecord');

class CompanyService {
  constructor(companyModel) {
    this.companyModel = companyModel;
  }

  async getCompany(companyId) {
    if (typeof companyId !== 'number' || companyId < 1) {
      throw badRequest;
    }

    const company = await this.companyModel.findOne({
      attributes: ['name', 'region', 'introduction', 'logo'],
      where: { id: companyId }
    });

    if (!company) {
      throw notFound;
    }

    company.dataValues.totalEmployed =
      await EmployeRecordService.getTotalEmployed(companyId);
    company.dataValues.employedPeople = 
      await EmployeRecordService.getEmployePeopleList(companyId);
    
    return company;
  }
}

module.exports = CompanyService;