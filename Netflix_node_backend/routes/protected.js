const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const movieController = require('../controllers/movieController')

router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
router.get('/movie', authenticate, movieController.get_movies);

module.exports = router;
