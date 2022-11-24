import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './reducers/accountReducer'
import priceReducer from './reducers/priceReducer'
import historialReducer from './reducers/historialReducer'
import balanceReducer from './reducers/balanceReducer'


const store = configureStore({
    reducer: {
        account: accountReducer,
        balance: balanceReducer,
        historial: historialReducer,
        price: priceReducer,
    }
  })

export default store