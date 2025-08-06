export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}