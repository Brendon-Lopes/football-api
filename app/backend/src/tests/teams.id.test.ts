import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = {
  id: 1,
  teamName: 'Fortaleza'
};

describe('GET /teams/:id', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(teamsMock as Team);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/teams/1');

      expect(response.status).to.equal(200);
    });
  });

  describe('when team is not found', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 404', async () => {
      const response = await chai
        .request(app)
        .get('/teams/1');

      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.deep.equal({ message: 'Team not found' });
    });
  })
});
