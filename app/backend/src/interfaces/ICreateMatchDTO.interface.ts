export interface IMatchGoalsDTO {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface ICreateMatchDTO extends IMatchGoalsDTO {
  homeTeam: string;
  awayTeam: string;
}
