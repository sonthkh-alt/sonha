
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

export interface ContactInfo {
    workplace: string;
    address: string;
    email: string;
    phone: string;
    mapUrl: string;
}

export interface ProfessionalActivity {
    id: string;
    title: string;
    description: string;
}

export type Page = 'home' | 'dissertation' | 'research' | 'admin' | 'contact';