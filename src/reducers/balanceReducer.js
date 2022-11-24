import { createSlice } from '@reduxjs/toolkit'
import contractsService from '../services/contractsService';
const balanceSlice = createSlice({
    name: 'balance',
    initialState: 0,
    reducers:{
        setBalance(state, action){
            return action.payload
        }
    }
})

export const {setBalance} = balanceSlice.actions

export const loadBalance = (account) => {
    return async dispatch =>{
        const balance = await contractsService.tokenBalance(account)
        dispatch(setBalance(balance))
    }
}

export default balanceSlice.reducer