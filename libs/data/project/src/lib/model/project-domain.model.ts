export interface Project {
  id: string;
  creatorId: string;
  votersIds: string[];
  title: string;
  description: string;
  alternatives: string[];
  criteria: string[];
  scores: number[];
}
