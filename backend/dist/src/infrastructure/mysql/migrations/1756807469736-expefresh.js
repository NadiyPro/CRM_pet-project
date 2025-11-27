"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expefresh1756807469736 = void 0;
class Expefresh1756807469736 {
    constructor() {
        this.name = 'Expefresh1756807469736';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD \`exp\` datetime NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP COLUMN \`exp\``);
    }
}
exports.Expefresh1756807469736 = Expefresh1756807469736;
//# sourceMappingURL=1756807469736-expefresh.js.map