export interface BaseMessageResDto {
    id: number;
    messages: string;
    orderId: number;
    manager: string | null;
    created_at: Date;
}
