export interface BaseMessageResDto {
  id: string;
  messages: string;
  studentId: string;
  managerId: string;
  managerSurname: string;
  created_at: Date;
  updated_at: Date;
}
