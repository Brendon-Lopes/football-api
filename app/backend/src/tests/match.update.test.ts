import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const matchMock = {
   id: 1, homeTeam: 1, awayTeam: 2, homeTeamGoals: 1, awayTeamGoals: 2, inProgress: true
}

describe('PATCH /matches/:id/finish', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves(matchMock as Match);
      sinon.stub(Match, 'update').resolves([ 0 ] as any);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(response.status).to.equal(StatusCodes.OK);
    });
  });

  describe('when it fails', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 404', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });
});

const matchUpdateSentDataMock = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

describe('PATCH /matches/:id', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves(matchMock as Match);
      sinon.stub(Match, 'update');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('returns status code 200', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/1')
        .send(matchUpdateSentDataMock);

      expect(response.status).to.equal(200);
    });
  });
});
