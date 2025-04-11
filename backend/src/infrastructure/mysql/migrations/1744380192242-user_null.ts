import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNull1744380192242 implements MigrationInterface {
  name = 'UserNull1744380192242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(25) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(25) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(100) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(25) NOT NULL`,
    );
  }
}
