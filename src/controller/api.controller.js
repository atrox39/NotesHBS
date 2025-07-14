const ApiService = require('../service/api.service');

class ApiController {
  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */ 
  static async index(req, res) {
    res.json({ message: 'API is working!' });
  }

  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await ApiService.register({ name, email, password });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await ApiService.login({ email, password });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy();
      res.json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ApiController;
