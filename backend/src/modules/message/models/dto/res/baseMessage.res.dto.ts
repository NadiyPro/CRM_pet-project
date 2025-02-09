export interface BaseMessageResDto {
  id: number;
  messages: string;
  orderId: number;
  managerId: string;
  manager: string;
  created_at: Date;
  updated_at: Date;
}
