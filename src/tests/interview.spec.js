const assert = require('assert');
const Interviews = require('../models/interviews');

describe('# interview model test', () => {
  describe('check create interview successly', async () => {
    const result = await Interviews.create({
      content: '자기소개를 해보세요.',
      field: '일반면접'
    });
    console.log(result['createdAt']);
  });
});