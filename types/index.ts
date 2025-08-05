export interface NavigationItem {
  label: string;
  href: string;
  subItems?: NavigationItem[];
}

export interface PartyPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  guests: number;
  featured: boolean;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  image?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface BusinessHours {
  [key: string]: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  price?: number;
  image?: string;
}

export interface SkateLesson {
  id: string;
  name: string;
  ageGroup: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  duration: string;
  price: number;
  schedule: string;
  description: string;
  maxStudents: number;
}