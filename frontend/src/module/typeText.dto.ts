export interface TypeTextDto{
  text: string;
  type: 'success' | 'error';
  id?: string | null;
  email?: string | null;
}
