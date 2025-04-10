import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1744196043514 implements MigrationInterface {
  name = 'UserTable1744196043514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(25) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(25) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(25) NULL`,
    );
  }
}
