import React from "react";
import { Button, TextField, Grid, Typography, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bnb from "../images/Binance-Coin-BNB-icon.png";
import contractsService from '../services/contractsService';
import { loadBalance } from "../reducers/balanceReducer";
import styled from "@emotion/styled";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#FFFFFF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#FFFFFF',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFFFFF',
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
    "&.MuiInputBase-root": {
      color: 'white'
  }
  },
});

const CButton = ({amount, change}) =>{
  return(
            <Button
            style={{
        maxWidth: "20%",
        minWidth: "20%",
      }}
              size="large"
              sx={{ m: 0.5 }}
              variant="contained"
              color="success"
              type="button"
              onClick={() => change(amount)}
            >
              {amount}
            </Button>
  )
}

const TotalCost = ({tokenAmount, price}) =>{
  if (tokenAmount > 0 && tokenAmount!==""){
      return (
        <Grid container justifyContent="center" alignItems="center">
          <Typography sx={{color:'#FFFFFF'}}>Cost: {tokenAmount*price} BNB</Typography>
          <Avatar
      alt=""
      src={bnb}
      sx={{ width: 24, height: 24 }}
    />
        </Grid>
      )
  }
}

const Buy = async(event, tokenAmount, change, price, account, dispatch) => {
  event.preventDefault();
  if (tokenAmount === ""){
    toast.error(`Please select an amount of tokens to buy`, {
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
    await contractsService.buyTokens(tokenAmount, tokenAmount*price)
    await dispatch(loadBalance(account));

    toast.success(`You have bought ${tokenAmount} tokens`, {
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

const BuyTokens = () => {

  const dispatch = useDispatch()

  const price = useSelector(({ price }) => {
    return price;
  });
  const account = useSelector(({ account }) => {
    return (
      account
    )
  })
  const tokenAmount = useField("");

  return (
    <Grid item>
      <Typography className="center" variant="h3" sx={{color:'#FFFFFF'}}>Tokens Store</Typography>
      <form onSubmit={(event)=>Buy(event, tokenAmount.value, tokenAmount.change, price, account, dispatch)}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
            <CButton amount={10} change={tokenAmount.change} tokenAmount={tokenAmount}/>
            <CButton amount={100} change={tokenAmount.change} tokenAmount={tokenAmount}/>
            <CButton amount={1000} change={tokenAmount.change} tokenAmount={tokenAmount}/>
            <CButton amount={10000} change={tokenAmount.change} tokenAmount={tokenAmount}/>
        </Grid>
        </Grid>

        <Grid item xs={12} sx={{ m: 0.25 }}>
          <Grid container alignItems="center" justifyContent="center">
          <CssTextField
    key={"hola"}
    size="normal"
    id="outlined-number"
    label="Amount of Tokens"
    type="number"
    color="secondary"
    value={tokenAmount.value}
    InputProps={{ inputProps: { min: 1 } }}
    onChange={tokenAmount.onChange}
    InputLabelProps={{
      style:{
        color:'white'
      }
    }}
  />
          </Grid>
        </Grid>
      
        <Grid item xs={12} sx={{ m: 0.25 }}>
        <TotalCost tokenAmount={tokenAmount.value} price={price} />
        </Grid>
        
        <Grid item xs={12} sx={{ m: 0.25 }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Button type="submit" size="large" variant="contained" color="warning">
            Buy
          </Button>
        </Grid>
        </Grid>
      </Grid>
    </form>
      <ToastContainer />
    </Grid>
  );
};
export default BuyTokens;
