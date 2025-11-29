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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./service/orders.service");
const approvedRole_guard_1 = require("../guards/approvedRole.guard");
const role_decorator_1 = require("../decorators/role.decorator");
const roleType_enum_1 = require("../../infrastructure/mysql/entities/enums/roleType.enum");
const listOrdersQuery_req_dto_1 = require("./models/dto/req/listOrdersQuery.req.dto");
const orders_mapper_1 = require("./service/orders.mapper");
const current_user_decorator_1 = require("../decorators/current_user.decorator");
const updateOrder_req_dto_1 = require("./models/dto/req/updateOrder.req.dto");
const statuseOrders_guard_1 = require("../guards/statuseOrders.guard");
const tableName_enum_1 = require("../../infrastructure/mysql/entities/enums/tableName.enum");
const createOrders_req_dto_1 = require("./models/dto/req/createOrders.req.dto");
const exceljs_1 = require("exceljs");
const listOrdersExportReqDto_req_dto_1 = require("./models/dto/req/listOrdersExportReqDto.req.dto");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async findAll(userData, query) {
        const [entities, total] = await this.ordersService.findAll(userData, query);
        return orders_mapper_1.OrdersMapper.toAllResDtoList(entities, total, query, userData);
    }
    async exportOrders(userData, query, res) {
        const [orders] = await this.ordersService.findAllExport(userData, query);
        const workbook = new exceljs_1.Workbook();
        const worksheet = workbook.addWorksheet('Orders');
        worksheet.addRow([
            'ID',
            'Name',
            'Surname',
            'Email',
            'Phone',
            'Age',
            'Course',
            'Course format',
            'Course type',
            'Status',
            'Sum',
            'Already Paid',
            'Created At',
            'Manager id',
            'Manager surname',
            'Group id',
            'Group Name',
        ]);
        orders.forEach((order) => {
            worksheet.addRow([
                order.id,
                order.name,
                order.surname,
                order.email,
                order.phone,
                order.age,
                order.course,
                order.course_format,
                order.course_type,
                order.status,
                order.sum,
                order.alreadyPaid,
                order.created_at,
                order.manager?.id ?? '',
                order.manager?.surname ?? '',
                order.group_id,
                order.group_name,
            ]);
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    }
    async createOrder(userData, createOrdersReqDto) {
        return await this.ordersService.createOrder(userData, createOrdersReqDto);
    }
    async ordersStatisticAll(userData) {
        return await this.ordersService.ordersStatisticAll(userData);
    }
    async ordersStatisticManager() {
        return await this.ordersService.ordersStatisticManager();
    }
    async addGroup(userData, orderId, group_id) {
        const orderNumber = +orderId;
        const group_idNumber = +group_id;
        return await this.ordersService.addGroup(userData, orderNumber, group_idNumber);
    }
    async updateId(userData, orderId, updateOrdersReqDto) {
        return await this.ordersService.updateId(userData, orderId, updateOrdersReqDto);
    }
    async findOneOrder(userData, orderId) {
        return await this.ordersService.findOneOrder(userData, orderId);
    }
    async deleteId(orderId) {
        return await this.ordersService.deleteId(orderId);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для отримання інформацію про всі orders',
        description: 'Admin | manager може отримати інформацію про всі orders, ' +
            'сортувати ASC | DESC за кожним полем та фільтрувати по кожному полю (за замовченням DESC)' +
            'Для запиту: limit - кількість елементів на сторінці, page - номер сторінка (за замовченням 25 шт), ' +
            'search - по кожному з полів можемо виконувати пошук (фільтр),  ' +
            'searchValues - по якому полю сортуємо, sortASCOrDESC - сортуємо по зростанню чи спаданню.' +
            'Приклад запиту: GET /orders?limit=25&page=1&name=John&status=active&sortField=created_at&sortASCOrDESC=DESC&me=true',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./models/dto/res/listOrdersQuery.res.dto").ListOrdersResQueryDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, listOrdersQuery_req_dto_1.ListOrdersQueryReqDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Експорт всіх заявок з урахуванням обраних фільтрів в Excel',
        description: 'Експорт всіх заявок з урахуванням обраних фільтрів в Excel',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)('export'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, listOrdersExportReqDto_req_dto_1.ListOrdersExportReqDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "exportOrders", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin може додати новий orders до списку',
        description: 'Admin може додати новий orders до списку',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../infrastructure/mysql/entities/orders.entity").OrdersEntity }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createOrders_req_dto_1.CreateOrdersReqDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin може переглядати статистику по всім заявам в розрізі статусів',
        description: 'Admin може переглядати статистику по всім заявам в розрізі статусів',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)('ordersStatisticAll'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "ordersStatisticAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Admin може переглядати статистику по всім заявам в розрізі статусів ' +
            'по конкретному менеджеру (по id менеджера)',
        description: 'Admin може переглядати статистику по всім заявам в розрізі статусів ' +
            'по конкретному менеджеру (по id менеджера)',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)('ordersStatisticManager'),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "ordersStatisticManager", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для додавання group до order',
        description: 'Для додавання group до order по group_id ' +
            '*(витягаємо всі групи з таблиці group та обираємо потрібну нам, зберігаємо значення). ',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard, statuseOrders_guard_1.OrdersGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Post)(':orderId/:group_id'),
    openapi.ApiResponse({ status: 201, type: require("../../infrastructure/mysql/entities/orders.entity").OrdersEntity }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('group_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addGroup", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для оновлення даних по orders',
        description: 'Manager може оновити дані по orders. ' +
            'При збережені заявки, якщо до цього status === New, або status === null, ' +
            'то буде автоматично змінено status на In_Work та підтягнеться Призвіще менеджера.' +
            '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin | manager)' +
            '*можна залишати пусті поля' +
            '*сортування по замовченню по полю created_at, DESC' +
            "*course може бути: FS, QACX, JCX', JSCX, FE, PCX\n" +
            '*course_format може бути: static, online\n' +
            '*course_type може бути: pro, minimal, premium, incubator, vip\n' +
            '*status може бути: In_work, New, Aggre, Disaggre, Dubbing\n',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard, statuseOrders_guard_1.OrdersGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Patch)(':orderId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updateOrder_req_dto_1.UpdateOrdersReqDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для відображення інформації по order за його id',
        description: 'Для відображення інформації по order за його id',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN, roleType_enum_1.RoleTypeEnum.MANAGER]),
    (0, common_1.Get)(':orderId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOneOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Для видалення запису про order за його id',
        description: 'Admin може видалити запис про order по його id ',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(approvedRole_guard_1.ApprovedRoleGuard),
    (0, role_decorator_1.Role)([roleType_enum_1.RoleTypeEnum.ADMIN]),
    (0, common_1.Delete)(':orderId'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('orderId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deleteId", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)(tableName_enum_1.TableNameEnum.ORDERS),
    (0, common_1.Controller)(tableName_enum_1.TableNameEnum.ORDERS),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map