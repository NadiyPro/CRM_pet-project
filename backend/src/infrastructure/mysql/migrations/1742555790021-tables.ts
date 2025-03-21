import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1742555790021 implements MigrationInterface {
  name = 'Tables1742555790021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`refreshToken\` text NOT NULL, \`deviceId\` text NOT NULL, \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`message\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`messages\` varchar(255) NULL, \`orderId\` int NULL, \`order\` int NULL, \`manager_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`group\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`group_name\` varchar(255) NULL, UNIQUE INDEX \`IDX_96a5a3483559c780044edb366e\` (\`group_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(25) NULL, \`surname\` varchar(25) NULL, \`email\` varchar(100) NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('manager', 'admin') NOT NULL DEFAULT 'admin', \`is_active\` tinyint NOT NULL DEFAULT 0, \`deleted\` timestamp NULL, INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`manager_id\` varchar(36) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`email\` \`email\` varchar(100) NULL DEFAULT 'student@gmail.com'`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course\` enum ('FS', 'QACX', 'JCX', 'JSCX', 'FE', 'PCX') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_format\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_format\` enum ('static', 'online') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_type\` enum ('pro', 'minimal', 'premium', 'incubator', 'vip') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` enum ('In_work', 'New', 'Aggre', 'Disaggre', 'Dubbing') NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_3c523f65ce114eecf052cf6cd2\` ON \`orders\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_ab746bd45d1f4680b0253dd0ac6\` FOREIGN KEY (\`order\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD CONSTRAINT \`FK_608f742c82f820de86018951b9b\` FOREIGN KEY (\`manager_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c23c7d2f3f13590a845802393d5\` FOREIGN KEY (\`manager_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_77b9403790bf253dd71cfcdb6a4\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_77b9403790bf253dd71cfcdb6a4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c23c7d2f3f13590a845802393d5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_608f742c82f820de86018951b9b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_ab746bd45d1f4680b0253dd0ac6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3c523f65ce114eecf052cf6cd2\` ON \`orders\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`status\` varchar(15) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_type\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`course_format\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course_format\` varchar(15) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`course\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`course\` varchar(10) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`email\` \`email\` varchar(100) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` ADD PRIMARY KEY (\`id\`)`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group_id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`manager_id\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_96a5a3483559c780044edb366e\` ON \`group\``,
    );
    await queryRunner.query(`DROP TABLE \`group\``);
    await queryRunner.query(`DROP TABLE \`message\``);
    await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
  }
}
