import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadOrdersAll } from '../reducers/orderLoad/loadOrdersAll';
import { ListOrdersDto } from '../../module/baseOrders.dto';
import { ListOrdersAllDto } from '../../module/listOrdersAll.dto';
import { SortFieldEnum } from '../../module/enums/sortFieldEnum';
import { loadOrdersExel } from '../reducers/orderLoad/loadOrdersExel';

interface OrderSliceInterface {
  dto: ListOrdersAllDto;
  data: ListOrdersDto;
}
const initialState: OrderSliceInterface = {
  data: {
    total: 0,
    orders: []
  },
  // dtoExel: {
  //   searchField: null,
  //   search: '',
  //   sortField: null,
  //   sortASCOrDESC: null,
  //   me: false,
  // },
  dto:{
    limit: 25,
    page: 1,
    searchField: null,
    search: '',
    sortField: null,
    sortASCOrDESC: null,
    me: false,
  }
}

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    setSearchField(state, action: PayloadAction<SortFieldEnum | null>) {
      state.dto.searchField = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.dto.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
    setMe(state, action: PayloadAction<boolean>) {
      state.dto.me = action.payload;
    },
    resetFilter(state) {
      state.dto.search = '';
      state.dto.searchField = null;
      state.dto.me = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersAll.fulfilled,(state, action) => {
          state.data.orders = action.payload.orders;
          state.data.total = action.payload.total;
    }
      )
      .addCase(
        loadOrdersExel.fulfilled,(state, action) => {
          state.data = action.payload
        }
      )
  }
})

export const orderAction = {
  ...orderSlice.actions,
  loadOrdersAll,
  loadOrdersExel
}
