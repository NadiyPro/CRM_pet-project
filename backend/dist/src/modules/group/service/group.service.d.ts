import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { BaseGroupResDto } from '../models/dto/res/baseGroup.res.dto';
import { BaseGroupReqDto } from '../models/dto/req/baseGroup.req.dto';
export declare class GroupService {
    private readonly groupRepository;
    constructor(groupRepository: GroupRepository);
    findAll(): Promise<BaseGroupResDto[]>;
    create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto>;
    deleteId(groupId: number): Promise<string>;
}
