export type Task = {
    id: string;
    title: string; 
    description: string; 
    date: string; 
    location: string; 
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled'; 
  };