import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadOrdersAll } from '../reducers/orderLoad/loadOrdersAll';
import { BaseOrdersDto } from '../../module/baseOrders.dto';
import { ListOrdersAllDto } from '../../module/listOrdersAll.dto';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { loadOrdersExel } from '../reducers/orderLoad/loadOrdersExel';
import { SortASCOrDESCEnum } from '../../module/enums/sortASCOrDESCEnum';
import { loadMessagesOrderId } from '../reducers/orderLoad/loadMessagesOrderId';
import { loadCreateMessage } from '../reducers/orderLoad/loadCreateMessage';
import { MessageResDto } from '../../module/messageRes.dto';
import { loadFindOneOrder } from '../reducers/orderLoad/loadFindOneOrder';
import { loadEditOrder } from '../reducers/orderLoad/loadEditOrder';
import { UpdateOrdersResDto } from '../../module/updateOrdersRes.dto';
import { GroupResDto } from '../../module/groupRes.dto';
import { loadCreateGroup } from '../reducers/orderLoad/loadCreateGroup';
import { loadAllGroup } from '../reducers/orderLoad/loadAllGroup';
import { loadAddGroup } from '../reducers/orderLoad/loadAddGroup';
import { GroupOrdersDto } from '../../module/groupOrders.dto';
import { TypeTextDto } from '../../module/typeText.dto';

interface OrderSliceInterface {
  dto: Partial<ListOrdersAllDto>;
  data: {
    orders: BaseOrdersDto[];
    total: number;
  };
  dataExel: string;
  findOneOrder: BaseOrdersDto;
  findOneOrderError: string | null;
  loadingExel: boolean;
  exportSuccess: TypeTextDto | null;
  messagesOrderId: MessageResDto[];
  createMessage: MessageResDto;
  isEditOrder: boolean;
  editOrder: UpdateOrdersResDto,
  createGroup: GroupResDto,
  allGroup: GroupResDto[] | null;
  addGroup: GroupOrdersDto,
  isAddGroupState: boolean;
  isDefaultGroupState: boolean;
  openedMessageOrderId: number | null;
  isCreateGroup: boolean;
  isDuplicate: boolean;
  isGroupOrder: TypeTextDto | null;
  // isGroupOrder: boolean;
  isNoGroup: boolean;
  isUpdateEditOrder: TypeTextDto | null;
}

const initialState: OrderSliceInterface = {
  dataExel: '',
  data: {
    orders: [],
    total: 0,
  },
  dto: {
    name: null,
    surname: null,
    email: null,
    phone: null,
    age: null,
    course: null,
    course_format: null,
    course_type: null,
    status: null,
    sum: null,
    alreadyPaid: null,
    manager: null,
    group_id:  null,
    group_name: null,
    limit: 25,
    page: 1,
    sortField: SortFieldEnum.CREATED_AT,
    sortASCOrDESC: SortASCOrDESCEnum.DESC,
    my: false,
  },
  findOneOrderError: null,
  findOneOrder: {
    id: null,
    name: null,
    surname: null,
    email: null,
    phone: null,
    age: null,
    course:null,
    course_format: null,
    course_type: null,
    status: null,
    sum: null,
    alreadyPaid: null,
    created_at: null,
    updated_at: null,
    manager: null,
    group_id: null,
    group_name: null,
    messages: null,
    utm: null,
    msg: null,
  },
  loadingExel: false,
  exportSuccess: null,
  messagesOrderId: [],
  createMessage: {
    id: 0,
    messages: '',
    orderId: 0,
    manager: null,
    created_at: null,
  },
  isEditOrder: false,
  editOrder:{
    id: null,
    name: null,
    surname: null,
    email: null,
    phone: null,
    age: null,
    course: null,
    course_format: null,
    course_type: null,
    status: null,
    sum: null,
    alreadyPaid: null,
    created_at: null,
    updated_at: null,
    manager: null,
    group_id: null,
    group_group_name: null,
    messages: [],
    utm: null,
    msg: null,
  },
  createGroup: {
    group_id: 0,
    group_group_name: '',
  },
  allGroup: [],
  addGroup: {
    id: null,
    group_id: null,
    group_group_name: null,
  },
  isAddGroupState: false,
  isDefaultGroupState: true,
  openedMessageOrderId: null,
  isCreateGroup: false,
  isDuplicate: false,
  isGroupOrder: null,
  // isGroupOrder: false,
  isNoGroup: false,
  isUpdateEditOrder: null
};

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    setSortField(state, action: PayloadAction<SortFieldEnum>) {
      state.dto.sortField = action.payload;
    },
    setSortASCOrDESC(state, action: PayloadAction<SortASCOrDESCEnum>) {
      state.dto.sortASCOrDESC = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
    setMe(state, action: PayloadAction<boolean>) {
      state.dto.my = action.payload;
      state.dto.page = 1;
    },
    resetFilter(state) {
      state.dto = {
        limit: 25,
        page: 1,
        sortField: SortFieldEnum.CREATED_AT,
        sortASCOrDESC: SortASCOrDESCEnum.DESC,
        my: false,
      };
    },
    setExportSuccess(state, action: PayloadAction<TypeTextDto | null>) {
      state.exportSuccess = action.payload;
    },
    setOpenMessagesOrderId(state, action: PayloadAction<number>){
      state.openedMessageOrderId = action.payload;
      // зберігаємо на яку id заявки клікнули, щоб під нею відкрити рядок для коментаря
    },
    setCloseMessagesOrderId(state){
      state.openedMessageOrderId = null;
    },
    setOpenEditOrderModal(state, action: PayloadAction<boolean>){
      state.isEditOrder = action.payload;
    },
    setAddGroupState(state, action: PayloadAction<boolean>){
      state.isAddGroupState = action.payload;
      state.isDefaultGroupState = !action.payload;
    },
    setDefaultGroupState(state, action: PayloadAction<boolean>){
      state.isDefaultGroupState =  action.payload;
    },
    setCreateGroup(state, action: PayloadAction<boolean>){
      state.isCreateGroup =  action.payload;
    },
    setDto: (state, action: PayloadAction<Partial<ListOrdersAllDto>>) => {
      const isNotPageUpdate = Object.keys(action.payload).some(key => key !== 'page');
      // Object.keys приймає об'єкт і повертає масив ключів (name, email, page і т.п)
      // витягує список змінених полів, які ми передаємо в setDto
      // .some(...) перевіряє, чи серед цих полів є хоч одне, що не дорівнює 'page'

      state.dto = {
        ...state.dto,
        ...action.payload, // оновлюємо лише передані поля
        ...(isNotPageUpdate ? { page: 1 } : {})
        // якщо ми змінили фільтри (наприклад name чи course), то скидаємо page на 1
        // якщо змінилась лише page — лишаємо її як є
      };
    }, // зберігати у state ті значення, які ми використовуємо для запиту
    setIsDuplicate(state, action: PayloadAction<boolean>){
      state.isDuplicate =  action.payload;
    },
    setIsGroupOrder(state, action: PayloadAction<TypeTextDto | null>){
      state.isGroupOrder =  action.payload;
    },
    setIsNoGroup(state, action: PayloadAction<boolean>){
      state.isNoGroup =  action.payload;
    },
    setIsUpdateEditOrder(state, action: PayloadAction<TypeTextDto | null>){
      state.isUpdateEditOrder=  action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersAll.fulfilled, (state, action) => {
          state.data.orders = action.payload.orders;
          state.data.total = action.payload.total;
        },
      )
      .addCase(loadOrdersAll.rejected, (state, action) => {
          console.error('Помилка завантаження всіх заявок:', action.payload);
        }
      )
      .addCase(
        loadOrdersExel.fulfilled, (state, action) => {
          state.dataExel = action.payload;
          state.loadingExel = false;
        },
      )
      .addCase(loadOrdersExel.pending, (state) => {
        state.loadingExel = true;
        state.exportSuccess = null;
      })
      .addCase(loadOrdersExel.rejected, (state, action) => {
        state.loadingExel = false;
          console.error('Помилка завантаження заявок в Exel файл:', action.payload);
        }
      )
      .addCase(loadFindOneOrder.fulfilled, (state, action) => {
        state.findOneOrder = action.payload;
        state.findOneOrderError = null;
        // state.findOneOrder.id = action.payload.id;
      })
      .addCase(loadFindOneOrder.rejected, (state, action) => {
        state.findOneOrder = { ...initialState.findOneOrder }; // скидуємо до дефолтних значень
        state.findOneOrderError = action.payload as string;
        // state.findOneOrder = 'Помилка. Перевірте права доступу (доступ лише для ролі admin)';
        // console.error('Помилка завантаження заявки по її id:', action.payload);
        }
      )
      .addCase(loadMessagesOrderId.fulfilled, (state, action) => {
        state.messagesOrderId = action.payload;
      })
      .addCase(loadMessagesOrderId.rejected, (state, action) => {
          console.error('Помилка завантаження messages:', action.payload);
        }
      )
      .addCase(loadCreateMessage.fulfilled, (state, action) => {
        state.createMessage = action.payload;
      })
      .addCase(loadCreateMessage.rejected, (state, action) => {
          console.error('Помилка при створенні message:', action.payload);
        }
      )
      .addCase(loadEditOrder.fulfilled, (state, action) => {
        state.editOrder = action.payload;
      })
      .addCase(loadEditOrder.rejected, (state, action) => {
          console.error('Помилка при редагувані заявки:', action.payload);
        }
      )
      .addCase(loadCreateGroup.fulfilled, (state, action) => {
        state.createGroup = action.payload;
        state.isAddGroupState = false;
        state.isDefaultGroupState = true;
      })
      .addCase(loadCreateGroup.rejected, (state, action) => {
          console.error('Помилка при створені нової групи:', action.payload);
        }
      )
      .addCase(loadAllGroup.fulfilled, (state, action) => {
        state.allGroup = action.payload;
      })
      .addCase(loadAllGroup.rejected, (state, action) => {
          console.error('Помилка при відображені всіх груп:', action.payload);
        }
      )
      .addCase(loadAddGroup.fulfilled, (state, action) => {
        state.addGroup = action.payload;
      })
      .addCase(loadAddGroup.rejected, (state, action) => {
          console.error('Помилка присвоєння групи для заявки:', action.payload);
        }
      )
  },
});

export const orderAction = {
  ...orderSlice.actions,
  loadOrdersAll,
  loadOrdersExel,
  loadFindOneOrder,
  loadMessagesOrderId,
  loadCreateMessage,
  loadEditOrder,
  loadCreateGroup,
  loadAllGroup,
  loadAddGroup
};
