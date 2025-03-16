import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Grid2, Typography } from '@mui/material';


export default function InputSlider({value, setValue, step = 1, min = 0, max = 100, label = "" }) {
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid2 container spacing={2} sx={{ alignItems: 'center'}}>
        <Grid2 size={10}>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
          />
        </Grid2>
        <Grid2 size={2}>
          <MuiInput
            sx={{minWidth: "42px"}}
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}