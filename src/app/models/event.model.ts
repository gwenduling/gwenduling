export interface EventDay {
  date: string;
  name: string;
  emoji: string[];
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  monthly?: boolean;
}
