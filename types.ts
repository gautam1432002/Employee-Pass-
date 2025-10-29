
export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  photo: string; // base64 string of the image
  registrationDate: string;
}

export type View = 'employee' | 'adminLogin' | 'adminDashboard';
