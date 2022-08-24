import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';
import { ILeaderboardData } from '../helpers/leaderboard.helper';

chai.use(chaiHttp);

const { expect } = chai;

const sequelizeMockReturn = [
  {
    "teamName": "São Paulo",
    "teamHome": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 0
      }
    ]
  },
  {
    "teamName": "Internacional",
    "teamHome": [
      {
        "homeTeamGoals": 1,
        "awayTeamGoals": 1
      },
      {
        "homeTeamGoals": 0,
        "awayTeamGoals": 4
      },
      {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
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

describe('GET /leaderboard/home', () => {
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
        .get('/leaderboard/home');

      expect(response.status).to.equal(200);
    });

    it('should return the correct data', async () => {
      const response = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(response.body).to.deep.equal(formattedDataMock);
    });
  });
});
