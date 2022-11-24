import { createSlice } from '@reduxjs/toolkit'
const accountSlice = createSlice({
    name: 'contract',
    initialState: "",
    reducers:{
        setAccount(state, action){
            return action.payload
        }
    }
})

export const {setAccount} = accountSlice.actions

export const loadAccounts = (account) => {
    return async dispatch =>{
        dispatch(setAccount(account))
    }
}

export default accountSlice.reducer