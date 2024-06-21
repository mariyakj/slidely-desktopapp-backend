// dbInterfaces.ts
export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

export interface DBSchema {
  submissions: Submission[];
}
