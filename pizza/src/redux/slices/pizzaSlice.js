import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy, order, category, search, currentPage} = params;
        const { data } = await axios.get(
            `https://63bc4726fa38d30d85c2e4cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
      return data;
    }
  )


const initialState = {
  items: []
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers:{
        [fetchPizzas.fulfilled]: (state, action) => {
            console.log("dfgh")
        }
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer