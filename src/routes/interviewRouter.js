const express = require('express');

const Interviews = require('../models/interviews');
const Interview = require('../services/interview');
const interview = new Interview(Interviews);

const router = express.Router();

router.get('/', async (req, res) => {
  const { page } = req.query;
  // field 값이 없다면 모든 field를 가져올 수 있게 하기 위해 false를 대입
  // mysql의 모든 문자열은 boolean으로 바꾸면 false이다.
  const field = req.query.field ? req.query.field : false;
  const maxShow = 10;  // 현재 10개로 고정해두기로 결정

  try {
    const results = await interview.getInterviewQuestions(page, field, maxShow);
    res.status(200).send(results);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

module.exports = router;