import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersAllDto {
  limit?: number,
  page?: number,
  searchValues?: string;
  search?: SortFieldEnum[];
  sortField?: SortFieldEnum;
  sortASCOrDESC?: SortASCOrDESCEnum;
  me?: boolean;
}