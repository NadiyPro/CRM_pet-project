import { CourseEnum } from './enums/course.enum';
import { CourseFormatEnum } from './enums/courseFormat.enum';
import { CourseTypeEnum } from './enums/courseType.enum';
import { StatusEnum } from './enums/status.enum';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';
export declare class OrdersEntity {
    id: number;
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    course: CourseEnum | null;
    course_format: CourseFormatEnum | null;
    course_type: CourseTypeEnum | null;
    sum: number | null;
    alreadyPaid: number | null;
    created_at: Date | null;
    updated_at?: Date | null;
    utm: string | null;
    msg: string | null;
    status: StatusEnum | null;
    group_id: number | null;
    group_name: string | null;
    manager: UserEntity | null;
    messages?: MessageEntity[] | null;
}
