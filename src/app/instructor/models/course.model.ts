
export interface Course {
    id: string;
    courseId: string;
    name: string;
    startDate: string; 
    endDate: string; 
    technology: string;
    status: "Upcoming" | "Ongoing"; 
    instructor: string;
  }
  