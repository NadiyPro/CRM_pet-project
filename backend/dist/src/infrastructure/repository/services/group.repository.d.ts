import { DataSource, Repository } from 'typeorm';
import { GroupEntity } from '../../mysql/entities/group.entity';
import { BaseGroupResDto } from '../../../modules/group/models/dto/res/baseGroup.res.dto';
export declare class GroupRepository extends Repository<GroupEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(): Promise<BaseGroupResDto[]>;
}
