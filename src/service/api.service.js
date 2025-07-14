const bcrypt = require('bcrypt');
const userModel = require('../model/user.model');

class ApiService {
  static async register(registerDto) {
    try {
      const { name, email, password } = registerDto;
      const user = await userModel.findOne({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) });
      if (user) {
        throw new Error('User already exists');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(loginDto) {
    try {
      const { email, password } = loginDto;
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ApiService;
