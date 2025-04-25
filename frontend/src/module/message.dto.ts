export interface MessageDto {
  id: number;
  messages: string;
  created_at: string | null;
  updated_at: string | null;
  order: {
    id: number;
  };
  manager: {
    id: number;
    name: string | null;
    surname: string | null;
  } | null;
}