import {  Grid, Box } from "@mui/material";
import { CustomTextField } from "./customTextField";
import CustomButton from "./CustomButton";

const SelectAmount = ({ TextFielValue, maxValue, onChangeValue, changeValue, buttonColor }) => {
    return (
      <Box>
        <Grid container spacing={{ xs: 1, md: 0 }}>
          <Grid item xs={12} md={4}>
            <Grid container alignItems="center" justifyContent="center">
              <CustomTextField
                key={"hola"}
                size="normal"
                id="outlined-number"
                label="Amount of Tokens"
                type="number"
                color="secondary"
                value={TextFielValue}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={onChangeValue}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container alignItems="center" justifyContent="center">
              <CustomButton
                display={"+10"}
                functionallity={()=>changeValue(parseInt(TextFielValue + 10))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
              <CustomButton
                display={"+100"}
                functionallity={()=>changeValue(parseInt(TextFielValue + 100))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
              <CustomButton
                display={"+1000"}
                functionallity={()=>changeValue(parseInt(TextFielValue + 1000))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container alignItems="center" justifyContent="center">
            <CustomButton
                display={"X2"}
                functionallity={()=>changeValue(parseInt(TextFielValue*2))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
              <CustomButton
                display={"1/2"}
                functionallity={()=>changeValue(parseInt(TextFielValue/2))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
              <CustomButton
                display={"MAX"}
                functionallity={()=>changeValue(parseInt(maxValue))}
                width={"10%"}
                size={'large'}
                backGround={buttonColor}
                text={'#e0e5bc'}
                margin= {0.5}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  export default SelectAmount