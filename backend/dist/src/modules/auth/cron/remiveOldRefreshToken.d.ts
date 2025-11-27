import { DataSource } from 'typeorm';
export declare class CronOldRefreshToken {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    handleCron(): Promise<void>;
}
