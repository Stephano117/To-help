const User = require('../models/user');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

class UserService {
  static async createUser(userData) {
    const user = await User.create({ ...userData });
    return user;
  }

  static async generateToken(user) {
    return jwt.sign({ id: user.id }, jwtSecret);
  }
}

module.exports = UserService;