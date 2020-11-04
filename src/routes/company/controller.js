const { Companys } = require('../../models');
const CompanyService = require('../../services/company');
const companyService = new CompanyService(Companys);

const { badRequest } = require('../../errors');

const getCompanyList = async (req,res) => {
  try {
    const companyPage = parseInt(req.query.page);
    if(isNaN(companyPage)) {
      throw badRequest;
    }
    const lists = await companyService.getCompanyList(companyPage);
    res.status(200).send({
      lists:lists
    });
  } catch(err) {
    res.status(err.status).send({
      message: err.message
    })
  }
}

const getCompany = async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    if (isNaN(companyId)) {
      throw badRequest;
    }

    const result = await companyService.getCompany(companyId);
    res.send(result);
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

module.exports = {
  getCompanyList,
  getCompany
};
