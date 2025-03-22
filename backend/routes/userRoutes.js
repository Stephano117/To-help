const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUser, UserController.register);

// route protégée
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;