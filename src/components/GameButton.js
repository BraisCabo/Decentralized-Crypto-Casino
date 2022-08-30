
import {Grid, Box} from "@mui/material";
import { useNavigate } from "react-router";
import CustomButton from "./CustomButton";

const GameButton = ({games}) => {
  const navigate = useNavigate()
  return (
<Grid container alignItems="center" justifyContent="center">
  <Grid item display={{ xs: "none", sm: "contents" }}>
  <CustomButton width={'20%'} backGround={'#222c31'}
    functionallity={()=>navigate("Roulette")}
    text={'#e0e5bc'} display={
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
            <Box component="div" alignItems="center" justifyContent="center" sx={{ overflow: "hidden", borderRadius: "10%"}}>
              <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center 40%",
                    transition: "0.5s",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10%",
                    "&:hover": {
                      scale: "1.2",
                      opacity: "0.5",
                    },
                  }}
                  alt=""
                  src={games.url}
                />
                </Grid>
              </Grid>
            </Box>
        </Grid>
        <Grid item xs={12}  >
          {games.title}
        </Grid>
      </Grid>
    } />
   
  </Grid>
  <Grid item display={{ xs: "contents", sm: "none" }}>
  <CustomButton width={'60%'} backGround={'#222c31'}
    functionallity={()=>navigate("Roulette")}
    text={'#e0e5bc'} display={
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
            <Box component="div" alignItems="center" justifyContent="center" sx={{ overflow: "hidden", borderRadius: "10%"}}>
              <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center 40%",
                    transition: "0.5s",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10%",
                    "&:hover": {
                      scale: "1.2",
                      opacity: "0.5",
                    },
                  }}
                  alt=""
                  src={games.url}
                />
                </Grid>
              </Grid>
            </Box>
        </Grid>
        <Grid item xs={12}  >
          {games.title}
        </Grid>
      </Grid>
    } />
  </Grid>
</Grid>
  );
};

export default GameButton;
