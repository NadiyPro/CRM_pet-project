import { MigrationInterface, QueryRunner } from "typeorm";

export class Expefresh1756807469736 implements MigrationInterface {
    name = 'Expefresh1756807469736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD \`exp\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP COLUMN \`exp\``);
    }

}
