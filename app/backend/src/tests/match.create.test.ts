import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import { StatusCodes } from 'http-status-codes';
import ValidateToken from '../middlewares/validateToken.middleware';
import JWT from '../helpers/jwt';
import Team from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

const matchMockSent = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const invalidMockSent = {
  "homeTeam": 16,
  "awayTeam": 16,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const matchMockReturn = {
  "id": 49,
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}

describe('POST /matches', () => {
  describe('when it succeeds', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findByPk').resolves({ id: 1, teamName: 'Fortaleza' } as Team);
      sinon.stub(Match, 'create').resolves(matchMockReturn as Match);
      sinon.stub(ValidateToken, 'validate');
      sinon.stub(JWT, 'decode').returns({ email: '', password: ''})
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 201', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'validToken')
        .send(matchMockSent);

      expect(response.status).to.equal(StatusCodes.CREATED);
    });

    it('should return the match', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'validToken')
        .send(matchMockSent);

      expect(response.body).to.deep.equal(matchMockReturn);
    });
  });

  describe('when it fails', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findByPk').resolves();
      sinon.stub(Match, 'create');
      sinon.stub(ValidateToken, 'validate');
      sinon.stub(JWT, 'decode').returns({ email: '', password: ''})
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return status code 401', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'validToken')
        .send(invalidMockSent);

      expect(response.status).to.equal(StatusCodes.UNAUTHORIZED);
    });
  });
});
