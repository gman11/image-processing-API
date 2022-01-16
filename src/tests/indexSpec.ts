import supertest from 'supertest';
import app from '../server/server';
import path from 'path';
import sharpResize from '../server/services/sharpService';

const request = supertest(app);

describe('Test endpoint with bad image name', () => {
  it('gets the api endpoint', () => {
    request
      .get('/api/resize?imageName=encenada.jpg&width=100&height=600')
      .expect(501);
  });
});

describe('Test endpoint with bad  width input', () => {
  it('gets the api endpoint', () => {
    request
      .get('/api/resize?imageName=encenadaport.jpg&width="asfd"&height=600')
      .expect(501);
  });
});

describe('Test endpoint with bad  height input', () => {
  it('gets the api endpoint', () => {
    request
      .get('/api/resize?imageName=encenadaport.jpg&width="600"&height=sfda')
      .expect(501);
  });
});

describe('Test sharp service', () => {
  it('should return true', async () => {
    const input = path.resolve(
      `./../image-processing-api/images/fullSize/encenadaport.jpg`
    );
    const output = path.resolve(
      `./../image-processing-api/images/thumb/encenadaport_600_600.jpg`
    );
    const width: number = 600;
    const height: number = 600;

    const response = await sharpResize(input, output, width, height);
    expect(response).toBeTrue();
  });
});
