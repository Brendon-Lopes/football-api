import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/user';

import { app } from '../app';

import JWT from '../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  email: "email@email.com",
  role: "admin",
}

describe('GET /login/validate', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(JWT, 'decode').returns({ email: userMock.email, password: '' });
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'validToken');

      expect(response.status).to.equal(200);
    });

    it('should return the user role', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'validToken');

      expect(response.body).to.deep.equal({ role: 'admin' });
    });
  });

  describe('when token is not sent', () => {
    beforeEach(() => {
      sinon.stub(JWT, 'decode').returns({ email: userMock.email, password: '' });
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 400 with the error message', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '');

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({ message: 'Invalid token' });
    });
  });

  describe('when user does not exist', () => {
    beforeEach(() => {
      sinon.stub(JWT, 'decode').returns({ email: userMock.email, password: '' });
      sinon.stub(User, 'findOne').resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 404 with the error message', async () => {
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'validToken');

      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: 'User not found' });
    });
  });
});
