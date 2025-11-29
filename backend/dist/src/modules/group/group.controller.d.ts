import { GroupService } from './service/group.service';
import { BaseGroupResDto } from './models/dto/res/baseGroup.res.dto';
import { BaseGroupReqDto } from './models/dto/req/baseGroup.req.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    findAll(): Promise<BaseGroupResDto[] | null>;
    create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto>;
    deleteId(groupId: number): Promise<string>;
}
