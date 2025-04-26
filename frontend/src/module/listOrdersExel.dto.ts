import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersExelDto {
  searchField?: SortFieldEnum | null;
  search?: string;
  sortField?: SortFieldEnum | null;
  sortASCOrDESC?: SortASCOrDESCEnum | null;
  me?: boolean;
}