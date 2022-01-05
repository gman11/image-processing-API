import request from 'supertest';
import express from 'express';

// it('expect inputChecker false', () => {
//   expect(ic.inputChecker()).toEqual(25);
// });
const app = express();

request(app)
  .get('http://localhost:3000/api/resize?imageName=encenadaport.jpg&width=300&height=600')
  .expect('Content-Type','image/jpeg')
  .expect(200)
  .end(function(err , res) {
    if (err) throw err;
  });