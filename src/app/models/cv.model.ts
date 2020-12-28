export interface CVData {
  intro: {
    name: string;
    title: string;
    website: string;
    bio: string;
  };
  personal: {
    birthday: string;
    address: string;
    email: string;
    mobile: string;
  };
  education: Education[];
  work: Work[];
  conferences: Conference[];
  responsibilities: Responsibility[];
  tools: Tool[];
}

export interface Education {
  school: string;
  date: string;
  content: string[];
}

export interface Work {
  company: string;
  link?: string;
  titles: WorkTitle[];
}

export interface WorkTitle {
  title: string;
  date: string;
}

export interface Conference {
  name: string;
  link?: string;
  date: string;
}

export interface Responsibility {
  for: string;
  content: string[];
}

export interface Tool {
  for: string;
  tools: {
    name: string;
    link?: string;
    description?: string;
  }[];
}
