const { Interviews } = require('../../models');
const Interview = require('../../services/interview');
const interview = new Interview(Interviews);

const { badRequest } = require('../../errors');

const getInterviewList = async (req, res) => {
  try {
    if(!Object.keys(req.query).length) {
      throw badRequest;
    }
    const page = parseInt(req.query.page);
    if (isNaN(page)) {
      throw badRequest;
    }
    // field 값이 없다면 모든 field를 가져올 수 있게 하기 위해 false를 대입
    // mysql의 모든 문자열은 boolean으로 바꾸면 false이다.
    let field = req.query.field;
    if (req.query.field === '\'\'' || !req.query.field) {
      field = false;
    }
    const keyword = req.query.keyword ? req.query.keyword : '';
    const maxShow = 6;

    const results = await interview.getInterviewQuestions(page, field, keyword, maxShow);
    const numOfQuestion = keyword ? results.length : await interview.getInterviewQuestions(field);
    
    res.send({
      isAdmin: req.isAdmin,
      lists: results,
      field: field ? field : undefined,
      numOfQuestion 
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const registerInterview = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw badRequest;
    }
    const { contents, field } = req.body;

    await interview.registerInterviewQuestions(contents, field);
    res.status(201).send();
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw badRequest;
    }
    const { content, field } = req.body;
    const id = parseInt(req.params.id);

    await interview.modifyInterviewQuestion(id, content, field);
    res.send();
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await interview.removeInterviewQuestion(id);
    res.send();
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
};

module.exports = {
  getInterviewList,
  registerInterview,
  updateInterview,
  deleteInterview
};
