import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contractsService from '../services/contractsService';
import { loadBalance } from "../reducers/balanceReducer";
import TotalBNB from "./TotalBNB";
import SelectAmount from "./SelectAmount";
  
  const Withdraw = async(event, tokenAmount, change, price, account, dispatch) => {
    event.preventDefault();
    if (tokenAmount === ""){
      toast.error(`Please select an amount of tokens to withdraw`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
    change(0);
    try{
      await contractsService.withdrawTokens(tokenAmount)
      await dispatch(loadBalance(account));
  
      toast.success(`You have withdrawn ${tokenAmount} tokens`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }catch(error){
      toast.error(`An error has occurred please try again later`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  };

  
  const WithdrawTokens = ({price, account, balance}) => {
  
    const dispatch = useDispatch()
    const tokenAmount = useField("");

    const auxChange = (amount) => {
      if (amount > balance) {
        toast.warn(
          `The amount of tokens to bet cant be higher than your balance`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        tokenAmount.change(balance);
      } else {
        tokenAmount.change(amount);
      }
    };
  
    return (
      <Grid container rowSpacing={2}>
      <Grid item xs={12}>
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h3" sx={{color:'#FFFFFF', width:'90%'}} align='center'>Withdraw Tokens</Typography>
        </Grid>
        </Grid>
    <Grid item xs={12}>
        <form onSubmit={(event)=>Withdraw(event, tokenAmount.value, tokenAmount.change, price, account, dispatch)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="center">
                <SelectAmount onChangeValue={tokenAmount.onChange} changeValue={auxChange} TextFielValue={tokenAmount.value} maxValue={balance} buttonColor={'#2e7d32'} />
            </Grid>
          </Grid>
        
          <Grid item xs={12} sx={{ m: 0.25 }}>
          <TotalBNB tokenAmount={tokenAmount.value} price={price} msg={'You will receive'}/>
          </Grid>
          
          <Grid item xs={12} sx={{ m: 0.25 }}>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Button type="submit" size="large" variant="contained" color="warning">
              Withdraw
            </Button>
          </Grid>
          </Grid>
        </Grid>
      </form>
      </Grid>
        <ToastContainer />
      </Grid>
    );
  };
  export default WithdrawTokens;