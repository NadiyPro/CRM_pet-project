import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersAllDto {
  limit?: number,
  page?: number,
  search?: Partial<Record<SortFieldEnum, string>>;
  sortField?: SortFieldEnum;
  sortASCOrDESC?: SortASCOrDESCEnum;
  me?: boolean;
}