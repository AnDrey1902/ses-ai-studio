export type Language = 'uk' | 'ru' | 'en';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  power?: string;
  sesType?: string;
  source: string;
  status: 'new' | 'in-progress' | 'closed';
  createdAt: string;
  lang: Language;
}

export interface WaitlistEmail {
  id: string;
  email: string;
  createdAt: string;
}

export interface SESPackage {
  id: string;
  kw: number;
  typeKey: 'hybrid' | 'ongrid' | 'business' | 'offgrid';
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  priceUsd: number;
  priceUah: number;
  payback: Record<Language, string>;
  inverter: string;
  panels: string;
  battery?: string;
  generationYear: number;
  popular?: boolean;
}

export interface CaseItem {
  id: string;
  title: Record<Language, string>;
  location: Record<Language, string>;
  power: string;
  sesType: Record<Language, string>;
  equipment: string;
  installDays: number;
  investmentUsd: number;
  payback: Record<Language, string>;
  quote: Record<Language, string>;
  image: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: Record<Language, string>;
  power: string;
  sesType: Record<Language, string>;
  rating: number;
  text: Record<Language, string>;
  avatar: string;
}

export interface FAQItem {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  tag: Record<Language, string>;
  tagKey: 'home' | 'business' | 'greentariff' | 'loan' | 'tech';
  publishedAt: string;
  readTime: Record<Language, string>;
  author: string;
  image: string;
}

export type CurrentView = 
  | 'home'
  | 'services'
  | 'prices'
  | 'cases'
  | 'blog'
  | 'blog_detail'
  | 'shop'
  | 'contacts'
  | 'admin'
  | 'privacy';
