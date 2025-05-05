import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersExelDto {
  searchValues?: string;
  search?: SortFieldEnum[];
  sortField?: SortFieldEnum | null;
  sortASCOrDESC?: SortASCOrDESCEnum | null;
  me?: boolean;
}