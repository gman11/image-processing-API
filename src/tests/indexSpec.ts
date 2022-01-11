import supertest from 'supertest';
// import express from 'express';
import app from '../server/server';

const request = supertest(app);

describe('Test endpoint with bad image name', () => {
  it('gets the api endpoint', async (done) => {
    const response = await request.get('/api/resize?imageName=encenada.jpg&width=100&height=600');
    expect(response.status).toBe(501);
    done();
  },
  );
});

describe('Test endpoint with bad  width input', () => {
  it('gets the api endpoint', async (done) => {
    const response = await request.get('/api/resize?imageName=encenadaport.jpg&width="asfd"&height=600');
    expect(response.status).toBe(501);
    done();
  },
  );
});
describe('Test endpoint with bad  height input', () => {
  it('gets the api endpoint', async (done) => {
    const response = await request.get('/api/resize?imageName=encenadaport.jpg&width="600"&height=sfda');
    expect(response.status).toBe(501);
    done();
  },
  );
});

describe('Test endpoint with good inputs', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/resize?imageName=encenadaport.jpg&width=600&height=600');
    expect(response.status).toBe(200);
    // done();
  },
  );
});
