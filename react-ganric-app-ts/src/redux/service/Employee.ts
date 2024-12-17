export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
}

/*
export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;

  constructor(id: number, firstName: string, lastName: string, emailId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailId = emailId;
  }

  // Method to return the full name of the employee
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Static method to create an Employee from a plain object (useful for deserialization)
  static fromPlainObject(obj: Partial<Employee>): Employee {
    return new Employee(
      obj.id || 0,
      obj.firstName || '',
      obj.lastName || '',
      obj.emailId || ''
    );
  }

  // Method to convert Employee to a plain object (useful for serialization)
  toPlainObject(): Partial<Employee> {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
    };
  }
}


*/




/*
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
}


*/