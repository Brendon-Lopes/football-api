import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [{
  id: 1,
  teamName: 'Fortaleza'
}];

describe('GET /teams', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(teamsMock as Team[]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/teams');

      expect(response.status).to.equal(200);
    });
  });
});
