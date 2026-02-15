
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

// Extend ImportMeta for Vite environment variables
declare global {
  interface ImportMeta {
    env: {
      [key: string]: string | undefined;
      VITE_GEMINI_API_KEY?: string;
      GEMINI_API_KEY?: string;
    };
  }
}
