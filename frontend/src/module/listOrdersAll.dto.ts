import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersAllDto {
  limit?: number,
  page?: number,
  searchField?: SortFieldEnum | null;
  search?: string;
  sortField?: SortFieldEnum | null;
  sortASCOrDESC?: SortASCOrDESCEnum | null;
  me?: boolean;
}