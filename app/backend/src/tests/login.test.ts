import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/user';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import ILoginDTO from '../interfaces/ILoginDTO.interface';

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

describe('User', () => {
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('when it succeeds should return status code 200', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(userMock);

      expect(response.status).to.equal(200);
    });

    it('when it fails should return status code 400', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send(invalidUserMock);

      expect(response.status).to.equal(400);
    });
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
