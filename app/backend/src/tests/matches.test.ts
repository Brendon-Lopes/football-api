import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/match';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

interface IMatchesMock extends Match {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

const matchesMock = [{
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  }];

describe('GET /matches endpoint', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(matchesMock as IMatchesMock[]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/matches');

      expect(response.status).to.equal(200);
    });

    it('should return a list of matches', async () => {
      const response = await chai
        .request(app)
        .get('/matches');

      expect(response.body).to.deep.equal(matchesMock);
    });
  });
});
