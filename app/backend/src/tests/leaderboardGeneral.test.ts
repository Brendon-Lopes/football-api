import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import LeaderboardService from '../services/leaderboard.service';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const getAllHomeMockReturn = [{
  "name": "Santos",
  "totalPoints": 9,
  "totalGames": 3,
  "totalVictories": 3,
  "totalDraws": 0,
  "totalLosses": 0,
  "goalsFavor": 9,
  "goalsOwn": 3,
  "goalsBalance": 6,
  "efficiency": 100
}];

const getAllAwayMockReturn = [{
  "name": "Santos",
  "totalPoints": 2,
  "totalGames": 2,
  "totalVictories": 0,
  "totalDraws": 2,
  "totalLosses": 0,
  "goalsFavor": 3,
  "goalsOwn": 3,
  "goalsBalance": 0,
  "efficiency": 33.33
}];

const formattedDataMock = [
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
]

describe('GET /leaderboard', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(LeaderboardService, 'getAllHome').resolves(getAllHomeMockReturn);
      sinon.stub(LeaderboardService, 'getAllAway').resolves(getAllAwayMockReturn);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard');

      expect(response.status).to.equal(200);
    });

    it('should return the correct data', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard');

      expect(response.body).to.deep.equal(formattedDataMock);
    });
  });
});
