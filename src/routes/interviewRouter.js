const express = require('express');

const Interviews = require('../models/interviews');
const Interview = require('../services/interview');
const interview = new Interview(Interviews);

const router = express.Router();

const { badRequest } = require('../errors');
const isNotObjctArgumnets = require('../utils/checkObjectArg');

router.get('/', async (req, res) => {
  try {
    if(isNotObjctArgumnets(req.query)) {
      throw badRequest;
    }

    const page = parseInt(req.query.page);
    // field 값이 없다면 모든 field를 가져올 수 있게 하기 위해 false를 대입
    // mysql의 모든 문자열은 boolean으로 바꾸면 false이다.
    const field = req.query.field ? req.query.field : false;
    const maxShow = 6;
  
    const results = await interview.getInterviewQuestions(page, field, maxShow);
    res.send({
      lists: results
    });
  } catch (error) {
    res.status(error.status).send({
      message: error.message
    });
  }
});

// router.post('/', async (req, res) => {
//   const { contents, field } = req.body;

//   try {
//     await interview.registerInterviewQuestions(contents, field);
//     res.status(201).send({ message: '성공적으로 면접 질문을 등록하였습니다.' });
//   } catch (error) {
//     res.status(error.status).send({ message: error.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   const { content, field } = req.body;

//   try {
//     await interview.modifyInterviewQuestion(id, content, field);
//     res.send({ message: '수정되었습니다.' });
//   } catch (error) {
//     res.status(error.status).send({ message: error.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const id = req.params.id;

//   try {
//     await interview.removeInterviewQuestion(id);
//     res.send({ message: '정상적으로 삭제되었습니다.' });
//   } catch (error) {
//     res.status(error.status).send({ message: error.message });
//   }
// });

module.exports = router;