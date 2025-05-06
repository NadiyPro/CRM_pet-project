import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';

export interface ListOrdersExelDto {
  search?: Partial<Record<SortFieldEnum, string>>;
  sortField?: SortFieldEnum | null;
  sortASCOrDESC?: SortASCOrDESCEnum | null;
  me?: boolean;
}