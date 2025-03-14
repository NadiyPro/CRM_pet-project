import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11741977971507 implements MigrationInterface {
    name = 'Test11741977971507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
    }

}
