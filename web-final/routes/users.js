var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

//사용자 조회
router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//사용자 등록
//먼저 모델로 만든 후 save()로 저장
router.post('/', function (req, res, next) {
  const user = new User({
    id: req.body.id,
    pwd: req.body.pwd,
    nickname: req.body.nickname,
  });

  user.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;

