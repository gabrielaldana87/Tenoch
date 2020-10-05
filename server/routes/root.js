const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

const root = () => {
  router.post('/authenticate', (req, res) => {
    user.create(req, res)
  });
  return router;
};

module.exports = root;