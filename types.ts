
export interface Feature {
  id: number;
  title: string;
  description: string;
  code: string;
}

export interface ResearchStep {
  title: string;
  status: 'pending' | 'active' | 'complete';
  content?: string;
}

export enum ResearchStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
