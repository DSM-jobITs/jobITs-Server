const { badRequest, notFound } = require('../errors');
const { BUCKET_URL } = require('../config');
const { EmployeRecord } = require('../models');
const EmployeRecordService = require('./employeRecord');
const employeRecordService = new EmployeRecordService(EmployeRecord);
const MAX_LIMIT = 12;

class CompanyService {
  constructor(companyModel) {
    this.companyModel = companyModel;
  }
  async getCompanyList(companyPage) {
    const company = await this.companyModel.findAll({
      include:  [
        {
          model: EmployeRecord,
          attributes: ['num_of_employed']
        }
      ],
      attributes: ['id','name','introduction','logo'],
      order: [['name','desc']],
      offset: MAX_LIMIT*(companyPage-1),
      limit: MAX_LIMIT,
    });//DB쪽 다시 손보기
    if(0 == company.length) { //빈배열 처리
      throw notFound;
    }
    for i in company {  //이미지 URL 추가
      i.dataValues.logo = BUCKET_URL + i.dataValues.logo;
    }

    return company;
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
    company.dataValues.logo = BUCKET_URL + company.dataValues.logo;
    company.dataValues.totalEmployed =
      await employeRecordService.getTotalEmployed(companyId);
    company.dataValues.employedPeople =
      await employeRecordService.getEmployedPeopleList(companyId);

    return company;
  }
}

module.exports = CompanyService;
