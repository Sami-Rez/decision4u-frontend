export interface ProjectCreateCommand {
  title: string;
  description: string;
  votersIds: string[];
  alternatives: string[];
  criteria: string[];
  alternativeJudgements: number[][];
}

export interface ProjectVoteCommand {
  projectId: string,
  // TODO rename criteriaAssessment
  votes: number[][],
}
