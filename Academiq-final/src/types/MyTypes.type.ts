export interface User {
  Email: string;
  role: string;
  id: number;
}


export interface Student {
  Id: number;
  Email: string;
  Role: string;
  Name: string;
  Phone: string | null;
  Address: string | null;
  City: string | null;
  Picture_URL: string | null;
  School_Year: string | null;
  Major: string | null;
  Enrollment: string | null;
  EmploymentStartDate: string | null;
}

export interface CourseType {
  CourseId?: number;
  CourseName: string;
  InstructorName: string;
  classRoomName: string;
  StartDate?: string;
  EndDate?: string;
}


export interface Assignment {
  assignmentId?: string;
  courseId: number;
  assignmentNumber: number;
  title: string;
  description: string;
  dueDate: Date;
  createdBy: number;
  isVisible: boolean;
  isCompleted?: boolean;
  attachments?: string[];
};