import React from 'react';
import { Avatar, Grid, Typography} from '@mui/material';
import rouleteIcon from "../images/Roulette.png";
import rouletteImage from "../images/Roulette.webp";
import GameButton from './GameButton';
import starImage from "../images/Gold-Star-PNG-Photos.png"

const image = {
    url: rouletteImage,
    title: <Grid container alignItems="center" justifyContent="center" columnSpacing={1} sx={{width:'100%'}}>
    <Grid item display={{ xs: "none", md: "contents" }}>
    <Avatar
alt=""
src={rouleteIcon}
sx={{ width: 40, height: 40 }}
display={{ xs: "none", md: "contents" }}
/>
    </Grid>
    <Grid item>
    <Typography variant='h5' sx={{color:'#FFFFFF'}}>Roulette</Typography>
    </Grid>
    </Grid>,
  };

const Roulette = () =>{
    return(
        <Grid item>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
        <Grid item xs = {12}>
            <Grid container alignItems="center" justifyContent="center">
            <Grid item>
            <Avatar
        alt=""
        src={starImage}
        sx={{ width: 50, height: 50 }}
      />
            </Grid>
            <Grid item>
      <Typography variant='h3' sx={{color:'#FFFFFF', fontSize:'1'}}>Games</Typography>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs = {12}>
            <Grid container alignItems="center" justifyContent="center">
            <GameButton games={image}/>
            </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

const Games = () => {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Roulette />
        </Grid>

    )
}
export default Games