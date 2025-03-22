const UserService = require('../services/userService');
const { validateUser } = require('../middleware/validationMiddleware');

class UserController {
  static async register(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      const token = await UserService.generateToken(user);

      res.status(201).json({user, token});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;