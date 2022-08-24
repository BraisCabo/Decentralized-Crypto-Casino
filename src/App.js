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
import Header from './components/Header';
import {
  Routes,
  Route,
} from "react-router-dom"

import RouletteGame from './components/RouletteGame';

const App = () => {
  const dispatch = useDispatch()
  const account = useSelector(({ account }) => {
    return (
      account
    )
  })



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
}, [account])


  return (
    <Grid container rowSpacing={{ xs: 8, sm: 9 }} sx={{ width: 1, backgroundColor: '#222c31'  }}>
    <Grid item xs={12}>
      <Header login={web3Handler}/>
    </Grid>
    <Grid item xs={12}>

      <Routes>
        <Route path="/buyTokens" element={<BuyTokens />} />
        <Route path="/games" element={<RouletteGame />} />
      </Routes>
      </Grid>
      </Grid>
  );
}

export default App;
