export interface MessageResDto {
  id: number;
  messages: string;
  orderId: number;
  manager: string | null;
  created_at: string;
}