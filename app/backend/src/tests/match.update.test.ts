import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('PATCH /matches/:id/finish', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findByPk').resolves({ id: 1, homeTeam: 1, awayTeam: 2, homeTeamGoals: 1, awayTeamGoals: 2, inProgress: true } as Match);
      sinon.stub(Match, 'update').resolves([ 0 ] as any);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .patch('/matches/1/finish')

      expect(response.status).to.equal(StatusCodes.OK);
    });
  });
});
