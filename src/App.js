import './App.css';
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { Grid } from '@mui/material';
import contractsService from './services/contractsService';
import {useDispatch, useSelector } from "react-redux";
import { loadAccounts } from './reducers/accountReducer';
import { loadBalance } from './reducers/balanceReducer';
import { loadPrice } from './reducers/priceReducer';
import { loadHistorial } from './reducers/historialReducer';
import BuyTokens from './components/BuyTokens';
import WithdrawTokens from './components/Withdraw';
import Header from './components/Header';
import {
  Routes,
  Route,
} from "react-router-dom"

import RouletteGame from './components/RouletteGame';
import Wallet from './components/Wallet';
import Games from './components/Games';

const App = () => {
  const dispatch = useDispatch()
  const balance = useSelector(({ balance }) => {
    return balance;
  });
  const account = useSelector(({ account }) => {
    return (
      account
    )
  })

  const price = useSelector(({ price }) => {
    return price;
  });

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    dispatch(loadAccounts(accounts[0]));
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      dispatch(loadAccounts(accounts[0]));
      await web3Handler();
    })
    await contractsService.loadContracts(signer);
  }

  const loadInfo = async () => {
    if (account !==""){
      await dispatch(loadBalance(account));
      await dispatch(loadPrice(account));
      await dispatch(loadHistorial(account))
    }
  }

  useEffect(() => {
    loadInfo()
}, [accoun])


  return (
    <Grid container rowSpacing={{ xs: 8, sm: 9 }} sx={{ width: 1, backgroundColor: '#222c31'  }}>
    <Grid item xs={12}>
      <Header login={web3Handler} balance={balance} account={account}/>
    </Grid>
    <Grid item xs={12}>

      <Routes>
        <Route path="/Wallet" element={<Wallet/>} > 
          <Route path="buyTokens" element={<BuyTokens account={account} price={price} />} />
          <Route path="withdrawTokens" element={<WithdrawTokens balance={balance} account={account} price={price}/>} />
        </Route>
        <Route path="/games" element={<Games/>}/>
        
        <Route path="/games/Roulette" element={<RouletteGame balance={balance} account={account} />} />
      </Routes>
      </Grid>
      </Grid>
  );
}

export default App;
