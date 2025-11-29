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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const group_repository_1 = require("../../../infrastructure/repository/services/group.repository");
let GroupService = class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async findAll() {
        return await this.groupRepository.findAll();
    }
    async create(group_name) {
        const existingGroup = await this.groupRepository.findOne({
            where: { group_name: group_name.group_name },
        });
        if (existingGroup) {
            throw new common_1.HttpException('Group already exists', common_1.HttpStatus.CONFLICT);
        }
        const newGroup = this.groupRepository.create(group_name);
        const createdGroup = await this.groupRepository.save(newGroup);
        return { id: createdGroup.id, group_name: createdGroup.group_name };
    }
    async deleteId(groupId) {
        await this.groupRepository.delete({ id: groupId });
        return 'The group in the table (db) was successfully deleted';
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [group_repository_1.GroupRepository])
], GroupService);
//# sourceMappingURL=group.service.js.map