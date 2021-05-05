export enum UserType {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  PROFESSIONAL = 'PROFESSIONAL',
  COMPANY = 'COMPANY',
}

export interface SelectListItem {
  id: number;
  name: string;
}
