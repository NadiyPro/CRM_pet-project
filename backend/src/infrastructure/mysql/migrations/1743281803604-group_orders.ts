import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupOrders1743281803604 implements MigrationInterface {
  name = 'GroupOrders1743281803604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group_id\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group_id\` int NULL`);
  }
}
