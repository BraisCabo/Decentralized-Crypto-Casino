import './App.css';
import React from 'react';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Button } from '@mui/material';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    })

  }

  return (
    <div>
       <Button variant="contained" color="primary" onClick={() => web3Handler()}>
            login
        </Button>
    </div>
  );
}

export default App;
