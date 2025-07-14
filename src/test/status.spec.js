const request = require('supertest');
const app = require('../app');

describe('GET /status', () => {
  it('Should return 200 Ok', () => {
    return request(app).get('/status')
    .expect('Content-Type', /json/) 
    .expect(200)
    .then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});
