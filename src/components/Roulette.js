import React from "react";
import 'react-roulette-pro/dist/index.css';
import { Wheel } from 'react-custom-roulette'

const data = [
    { id: 0, option: 0 , style:{ backgroundColor: 'green', textColor: 'white' }},
    { id: 1, option: 1 , style:{ backgroundColor: 'red', textColor: 'white' }},
    { id: 2, option: 8, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 3, option: 2, style:{ backgroundColor: 'red', textColor: 'white'}},
    { id: 4, option: 9, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 5, option: 3, style:{ backgroundColor: 'red', textColor: 'white' }},
    { id: 6, option: 10, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 7, option: 4, style:{ backgroundColor: 'red', textColor: 'white'}},
    { id: 8, option: 11, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 9, option: 5, style:{ backgroundColor: 'red', textColor: 'white' }},
    { id: 10, option: 12, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 11, option: 6, style:{ backgroundColor: 'red', textColor: 'white' }},
    { id: 12, option: 13, style:{ backgroundColor: 'black', textColor: 'white'}},
    { id: 13, option: 7, style:{ backgroundColor: 'red', textColor: 'white'}},
    { id: 14, option: 14, style:{ backgroundColor: 'black', textColor: 'white'}},
  ];

 const Ruleta = ({newPrizeNumber, mustSpin, functionallity}) => {;
    const prizePos = data.filter(element => element.option === newPrizeNumber)
    const finalNumber = prizePos[0].id
    return (
        <div align="center">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={finalNumber}
            data={data}
            outerBorderColor={["#111111"]}
            outerBorderWidth={[25]}
            radiusLineColor={["#f2b972"]}
            radiusLineWidth={[10]}
            fontSize={[40]}
            perpendicularText={[false]}
            textDistance={[75]}
            onStopSpinning={() => {
              functionallity()
            }}
          />
        </div>
    );
  };


export default Ruleta;
