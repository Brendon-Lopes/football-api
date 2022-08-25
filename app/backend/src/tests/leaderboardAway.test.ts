import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const sequelizeMockReturn = [
  {
    "teamName": "São Paulo",
    "teamAway": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 3
      }
    ]
  },
  {
    "teamName": "Internacional",
    "teamAway": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 4,
        "awayTeamGoals": 0
      },
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 3
      }
    ]
  },
];

const formattedDataMock = [
  {
    name: 'São Paulo',
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 1,
    goalsBalance: 3,
    efficiency: 66.67
  },
  {
    name: 'Internacional',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 4,
    goalsOwn: 6,
    goalsBalance: -2,
    efficiency: 44.44
  }
]

describe('GET /leaderboard/away', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(sequelizeMockReturn as unknown as Team[]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 200', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(response.status).to.equal(200);
    });

    it('should return the correct data', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(response.body).to.deep.equal(formattedDataMock);
    });
  });
});
