import { createSlice } from '@reduxjs/toolkit';
import contractsService from '../services/contractsService';
const priceSlice = createSlice({
    name: 'price',
    initialState: "",
    reducers:{
        setPrice(state, action){
            return action.payload
        }
    }
})

export const {setPrice} = priceSlice.actions

export const loadPrice = (acc) => {
    return async dispatch =>{
        const price = await contractsService.tokenPrice(acc)
        dispatch(setPrice(price))
    }
}

export default priceSlice.reducer