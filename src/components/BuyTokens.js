import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contractsService from '../services/contractsService';
import { loadBalance } from "../reducers/balanceReducer";
import { CustomTextField } from "./customTextField";
import TotalBNB from "./TotalBNB";
import CustomButton from "./CustomButton";

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

const BuyTokens = ({account, price}) => {

  const dispatch = useDispatch()
  const tokenAmount = useField("");

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h3" sx={{color:'#FFFFFF', width:'90%'}} align='center'>Tokens Store</Typography>
        </Grid>
        </Grid>
        <Grid item xs={12}>
      <form onSubmit={(event)=>Buy(event, tokenAmount.value, tokenAmount.change, price, account, dispatch)}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
          <CustomButton
                display={"10"}
                functionallity={()=>tokenAmount.change(parseInt(10))}
                width={"20%"}
                size={'large'}
                backGround={'#2e7d32'}
                text={'#e0e5bc'}
                margin= {0.5}
              />
            <CustomButton
                display={"100"}
                functionallity={()=>tokenAmount.change(parseInt(100))}
                width={"20%"}
                size={'large'}
                backGround={'#2e7d32'}
                text={'#e0e5bc'}
                margin= {0.5}
              />
            <CustomButton
                display={"1000"}
                functionallity={()=>tokenAmount.change(parseInt(1000))}
                width={"20%"}
                size={'large'}
                backGround={'#2e7d32'}
                text={'#e0e5bc'}
                margin= {0.5}
              />
            <CustomButton
                display={"10000"}
                functionallity={()=>tokenAmount.change(parseInt(10000))}
                width={"20%"}
                size={'large'}
                backGround={'#2e7d32'}
                text={'#e0e5bc'}
                margin= {0.5}
              />
        </Grid>
        </Grid>

        <Grid item xs={12} sx={{ m: 0.25 }}>
          <Grid container alignItems="center" justifyContent="center">
          <CustomTextField
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
        <TotalBNB tokenAmount={tokenAmount.value} price={price} msg={'Cost :'}/>
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
    </Grid>
      <ToastContainer />
    </Grid>
  );
};
export default BuyTokens;
