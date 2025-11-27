"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("node:path");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const configuration_1 = require("./src/configs/configuration");
dotenv.config();
const config = (0, configuration_1.default)().database;
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: config.host,
    port: config.port || 3306,
    username: config.user,
    password: config.password,
    database: config.name,
    entities: [
        path.join(process.cwd(), 'src/infrastructure/mysql/entities/*.ts'),
    ],
    migrations: [
        path.join(process.cwd(), 'src/infrastructure/mysql/migrations/*.ts'),
    ],
    synchronize: false,
});
//# sourceMappingURL=ormconfig.js.map