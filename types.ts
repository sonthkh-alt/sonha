
export interface Paper {
  id: string;
  title: string;
  summary: string;
  fileUrl: string;
}

export interface Dissertation {
  title: string;
  summary: string;
  fileUrl: string;
}

export type Page = 'home' | 'dissertation' | 'research' | 'admin' | 'contact';
