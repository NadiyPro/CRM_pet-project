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
import { CourseEnum } from '../../module/enums/courseEnum';
import { CourseFormatEnum } from '../../module/enums/courseFormatEnum';
import { CourseTypeEnum } from '../../module/enums/courseTypeEnum';
import { StatusEnum } from '../../module/enums/statusEnum';

interface OrderSliceInterface {
  dto: ListOrdersAllDto;
  data: {
    orders: BaseOrdersDto[];
    total: number;
  };
  dataExel: string;
  findOneOrder: BaseOrdersDto;
  loadingExel: boolean;
  exportSuccess: string;
  messagesOrderId: MessageResDto[];
  createMessage: MessageResDto;
  isMessagesOrderId: boolean;
  isEditOrder: boolean;
  editOrder: UpdateOrdersResDto
}

const initialState: OrderSliceInterface = {
  dataExel: '',
  data: {
    orders: [],
    total: 0,
  },
  dto: {
    limit: 25,
    page: 1,
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
    created_at: '',
    manager: null,
    group_id: null,
    group_name: null,
    sortField: SortFieldEnum.CREATED_AT,
    sortASCOrDESC: SortASCOrDESCEnum.DESC,
    me: false,
  },
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
    created_at: '',
    updated_at: null,
    manager: null,
    group_id: null,
    group_name: null,
    messages: null,
    utm: null,
    msg: null,
  },
  loadingExel: false,
  exportSuccess: '',
  messagesOrderId: [],
  createMessage: {
    id: 0,
    messages: '',
    orderId: 0,
    manager: null,
    created_at: '',
  },
  isMessagesOrderId: false,
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
    created_at: '',
    updated_at: null,
    manager: null,
    group_id: null,
    group_name: null,
    messages: [],
    utm: null,
    msg: null,
  }
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
      state.dto.me = action.payload;
    },
    resetFilter(state) {
      state.dto = {
        limit: 25,
        page: 1,
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
        created_at: '',
        manager: null,
        group_id: null,
        group_name: null,
        sortField: SortFieldEnum.CREATED_AT,
        sortASCOrDESC: SortASCOrDESCEnum.DESC,
        me: false,
      };
    },
    setExportSuccess(state, action: PayloadAction<string>) {
      state.exportSuccess = action.payload;
    },
    setOpenMessagesOrderId(state){
      state.isMessagesOrderId = true;
    },
    setCloseMessagesOrderId(state){
      state.isMessagesOrderId = false;
    },
    setOpenEditOrderModal(state){
      state.isEditOrder = true;
    },
    setCloseEditOrderModal(state){
      state.isEditOrder = false;
    }
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
        state.exportSuccess = '';
      })
      .addCase(loadOrdersExel.rejected, (state, action) => {
        state.loadingExel = false;
          console.error('Помилка завантаження заявок в Exel файл:', action.payload);
        }
      )
      .addCase(loadFindOneOrder.fulfilled, (state, action) => {
        state.findOneOrder = action.payload;
        state.findOneOrder.id = action.payload.id;
      })
      .addCase(loadFindOneOrder.rejected, (state, action) => {
          console.error('Помилка завантаження заявки по її id:', action.payload);
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
  },
});

export const orderAction = {
  ...orderSlice.actions,
  loadOrdersAll,
  loadOrdersExel,
  loadFindOneOrder,
  loadMessagesOrderId,
  loadCreateMessage,
  loadEditOrder
};
