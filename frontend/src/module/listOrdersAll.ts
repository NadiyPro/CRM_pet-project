import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersAll{
  limit?: number,
  page?: number,
  search?: string;
  sortField?: SortFieldEnum | null;
  sortASCOrDESC?: SortASCOrDESCEnum | null;
  me?: boolean;
}