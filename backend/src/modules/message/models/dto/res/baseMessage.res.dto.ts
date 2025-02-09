export interface BaseMessageResDto {
  id: string;
  messages: string;
  orderId: number;
  managerId: string;
  manager: string;
  created_at: Date;
  updated_at: Date;
}
