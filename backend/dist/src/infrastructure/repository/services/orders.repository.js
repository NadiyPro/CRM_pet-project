"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("../../mysql/entities/orders.entity");
const sortField_enum_1 = require("../../../modules/enums/sortField.enum");
let OrdersRepository = class OrdersRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(orders_entity_1.OrdersEntity, dataSource.manager);
        this.dataSource = dataSource;
    }
    async findAll(userData, query) {
        const qb = this.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.manager', 'manager')
            .leftJoinAndSelect('orders.messages', 'messages');
        if (query.my) {
            qb.andWhere('manager.id = :userId', { userId: userData.userId });
        }
        const allowedFields = Object.keys(query);
        const excludedFields = [
            'limit',
            'page',
            'sortField',
            'sortASCOrDESC',
            'my',
        ];
        const numericFields = [
            'age',
            'sum',
            'alreadyPaid',
        ];
        for (const key of allowedFields) {
            if (excludedFields.includes(key))
                continue;
            const value = query[key];
            if (value === null || value === undefined || value === '')
                continue;
            const param = `search_${key}`;
            const field = key === 'manager' ? 'manager.surname' : `orders.${key}`;
            if (key === 'created_at_from' || key === 'created_at_to') {
                if (key === 'created_at_from') {
                    const fromDate = new Date(value);
                    qb.andWhere('orders.created_at >= :created_at_from', {
                        created_at_from: fromDate,
                    });
                    continue;
                }
                if (key === 'created_at_to') {
                    const toDate = new Date(value);
                    toDate.setDate(toDate.getDate() + 1);
                    qb.andWhere('orders.created_at < :created_at_to', {
                        created_at_to: toDate,
                    });
                    continue;
                }
            }
            const selectOptionEnum = [
                'course',
                'course_format',
                'course_type',
                'status',
            ];
            if (numericFields.includes(key)) {
                qb.andWhere(`${field} = :${param}`, { [param]: value });
            }
            else if (selectOptionEnum.includes(key)) {
                qb.andWhere(`${field} = :${param}`, { [param]: value });
            }
            else {
                qb.andWhere(`${field} LIKE :${param}`, { [param]: `%${value}%` });
            }
        }
        if (query.sortField && query.sortASCOrDESC) {
            const column = query.sortField === sortField_enum_1.SortFieldEnum.MANAGER
                ? 'manager.surname'
                : `orders.${query.sortField}`;
            const order = query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            qb.orderBy(column, order);
        }
        else {
            qb.orderBy('orders.created_at', 'DESC');
        }
        const limit = query.limit || 25;
        const page = query.page || 1;
        qb.take(limit);
        qb.skip((page - 1) * limit);
        return await qb.getManyAndCount();
    }
    async findAllExport(userData, query) {
        const qbExport = this.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.manager', 'manager')
            .leftJoinAndSelect('orders.messages', 'messages');
        if (query.my) {
            qbExport.andWhere('manager.id = :userId', { userId: userData.userId });
        }
        const allowedFields = Object.keys(query);
        const excludedFields = [
            'limit',
            'page',
            'sortField',
            'sortASCOrDESC',
            'my',
        ];
        const numericFields = [
            'age',
            'sum',
            'alreadyPaid',
        ];
        for (const key of allowedFields) {
            if (excludedFields.includes(key))
                continue;
            const value = query[key];
            if (value === null || value === undefined || value === '')
                continue;
            const param = `search_${key}`;
            const field = key === 'manager' ? 'manager.surname' : `orders.${key}`;
            if (key === 'created_at_from' || key === 'created_at_to') {
                if (key === 'created_at_from' || key === 'created_at_to') {
                    if (key === 'created_at_from') {
                        const fromDate = new Date(value);
                        qbExport.andWhere('orders.created_at >= :created_at_from', {
                            created_at_from: fromDate,
                        });
                        continue;
                    }
                    if (key === 'created_at_to') {
                        const toDate = new Date(value);
                        toDate.setDate(toDate.getDate() + 1);
                        qbExport.andWhere('orders.created_at < :created_at_to', {
                            created_at_to: toDate,
                        });
                        continue;
                    }
                }
            }
            const selectOptionEnum = [
                'course',
                'course_format',
                'course_type',
                'status',
            ];
            if (numericFields.includes(key)) {
                qbExport.andWhere(`${field} = :${param}`, { [param]: value });
            }
            else if (selectOptionEnum.includes(key)) {
                qbExport.andWhere(`${field} = :${param}`, { [param]: value });
            }
            else {
                qbExport.andWhere(`${field} LIKE :${param}`, { [param]: `%${value}%` });
            }
        }
        if (query.sortField && query.sortASCOrDESC) {
            const column = query.sortField === sortField_enum_1.SortFieldEnum.MANAGER
                ? 'manager.surname'
                : `orders.${query.sortField}`;
            const order = query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            qbExport.orderBy(column, order);
        }
        else {
            qbExport.orderBy('orders.created_at', 'DESC');
        }
        return await qbExport.getManyAndCount();
    }
    async ordersStatisticAll() {
        return await this.createQueryBuilder('orders')
            .select([
            'COUNT(orders.id) as total',
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'in_work' THEN orders.id END) as In_work",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'new' THEN orders.id END) as New",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'aggre' THEN orders.id END) as Aggre",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'disaggre' THEN orders.id END) as Disaggre",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'dubbing' THEN orders.id END) as Dubbing",
            "COUNT(CASE WHEN orders.status IS NULL OR orders.status = '' THEN orders.id END) as No_status",
        ])
            .getRawOne();
    }
    async ordersStatisticManager() {
        return await this.createQueryBuilder('orders')
            .leftJoin('orders.manager', 'manager')
            .select([
            'manager.id AS manager',
            'COUNT(orders.id) as total',
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'in_work' THEN orders.id END) as In_work",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'aggre' THEN orders.id END) as Aggre",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'disaggre' THEN orders.id END) as Disaggre",
            "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'dubbing' THEN orders.id END) as Dubbing",
        ])
            .groupBy('manager.id')
            .getRawMany();
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map