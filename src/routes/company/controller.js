const { Companys } = require('../../models');
const CompanyService = require('../../services/company');
const companyService = new CompanyService;

const { badRequest } = require('../../errors');

const getCompany = async (req, res) => {
  try {
    const companyId = parseInt(req.params.id);
    if (isNaN(companyId)) {
      throw badRequest;
    }

    const result = await companyService.getCompany(companyId);
    res.send({
      result
    });
  } catch (error) {
    console.error(error);
    res.status(error.status).send({
      message: error.message
    });
  }
};

module.exports = {
  getCompany
};