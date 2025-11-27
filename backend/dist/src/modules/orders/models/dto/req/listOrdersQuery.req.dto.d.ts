import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';
import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';
export declare class ListOrdersQueryReqDto {
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    phone?: string | null;
    age?: number | null;
    course?: CourseEnum | null;
    course_format?: CourseFormatEnum | null;
    course_type?: CourseTypeEnum | null;
    sum?: number | null;
    alreadyPaid?: number | null;
    status?: StatusEnum | null;
    group_name?: string | null;
    manager?: string | null;
    created_at_from?: string | null;
    created_at_to?: string | null;
    limit?: number;
    page?: number;
    sortField?: SortFieldEnum;
    sortASCOrDESC?: SortASCOrDESCEnum;
    my?: boolean;
}
