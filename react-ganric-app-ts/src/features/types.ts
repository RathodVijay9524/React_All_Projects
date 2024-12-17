export interface BaseEntity {
  id: number;
}

export interface Employee extends BaseEntity {
  firstName: string;
  lastName: string;
  emailId: string;
 
}

export interface GenericState<T> { 
  items: T[]; 
  loading: boolean; 
  error: string | null; 
  successMessage: string; 
}