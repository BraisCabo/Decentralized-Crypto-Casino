import { Outlet } from 'react-router';
import { Grid} from '@mui/material';
import { useNavigate } from "react-router";
import CustomButton from './CustomButton';

const Header = () =>{
    const navigate = useNavigate()
    return (
        <Grid container columnSpacing={3}>
        <Grid item xs={6}>
        <Grid container alignItems="end" justifyContent="right">
        <CustomButton
                display={"Deposit"}
                functionallity={() => navigate("buyTokens")}
                size={'large'}
                backGround={'#2f3d45'}
                text={'#e0e5bc'}
              />
        </Grid>
        </Grid>
        <Grid item xs={6}>
        <Grid container alignItems="start" justifyContent="left">
        <CustomButton
                display={"Withdraw"}
                functionallity={() => navigate("withdrawTokens")}
                size={'large'}
                backGround={'#2f3d45'}
                text={'white'}
              />
        </Grid>
        </Grid>
        </Grid>
    )
}

const Wallet = () =>{
    return(
        <Grid container rowSpacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
                <Header/>
            </Grid>
        <Grid item xs = {12}>
        <Outlet />
        </Grid>
        </Grid>
    )
}
export default Wallet