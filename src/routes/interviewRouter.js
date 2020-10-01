const express = require('express');

const Interviews = require('../models/interviews');
const Interview = require('../services/interview');
const interview = new Interview(Interviews);

const router = express.Router();

router.get('/', async (req, res) => {
  const { page } = req.query;
  // field 값이 없다면 모든 field를 가져올 수 있게 하기 위해 false를 대입
  // mysql의 모든 문자열은 boolean으로 바꾸면 false이다.
  const field = req.query.field ? (req.query.field).split(',') : false;
  const maxShow = 10;  // 현재 10개로 고정해두기로 결정

  try {
    const results = await interview.getInterviewQuestions(page, field, maxShow);
    res.send({ lists: results });
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const { questions, field } = req.body;

  try {
    await interview.registerInterviewQuestions(questions, field);
    res.status(201).send({ message: '성공적으로 면접 질문을 등록하였습니다.' });
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

module.exports = router;