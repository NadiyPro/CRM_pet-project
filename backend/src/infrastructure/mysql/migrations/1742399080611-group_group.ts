import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupGroup1742399080611 implements MigrationInterface {
  name = 'GroupGroup1742399080611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c2344b0fe553895e42e7cd0a9c8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`group\` \`group_group\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_36abc46146e5fa3f2762f3fce84\` FOREIGN KEY (\`group_group\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_36abc46146e5fa3f2762f3fce84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`group_group\` \`group\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c2344b0fe553895e42e7cd0a9c8\` FOREIGN KEY (\`group\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
