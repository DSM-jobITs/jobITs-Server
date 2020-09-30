const express = require('express');

const Interviews = require('../models/interviews');
const Interview = require('../services/interview');
const interview = new Interview(Interviews);

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { page, keyword } = req.query;
  const maxShow = 10;  // 현재 10개로 고정해두기로 결정
  
  if (keyword) {
  } else {
    const results = await interview.getAllFieldQuestions(page, maxShow);
    res.status(200).send(results);
  }

});

module.exports = router;