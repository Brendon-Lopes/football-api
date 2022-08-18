import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/user';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import ILoginDTO from '../interfaces/ILoginDTO.interface';
import JWT from '../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: ILoginDTO = {
  email: "email@email.com",
  password: "123456",
}

const invalidUserMock: ILoginDTO = {
  email: "invalid@email.com",
  password: "654321",
}

describe('POST /login', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
      sinon.stub(JWT, 'sign').returns('validToken');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.equal(200);
    });

    it('should return a token', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(userMock);
      
      expect(response.body).to.deep.equal({ token: 'validToken' });
    });
  });

  describe('when it fails', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('should return status code 401', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(invalidUserMock);

      expect(response.status).to.equal(401);
    });
  });
});
