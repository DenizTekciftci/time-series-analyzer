import './App.css'
import React, { useEffect, useState } from "react";
import { PriceApiClient } from './services/priceApiClient';
import {
  Grid2,
} from "@mui/material";
import { LineChart1 } from './components/LineChart';
import InputSlider from './components/Slider';
import Dropdown from './components/Dropdown';
import { MovingAverage } from './utilities/movingAverageUtility';

const dataOptions = ["Price", "Moving average"]

function App() {
  var client = new PriceApiClient()
  const [prices, setPrices] = useState(null);
  const [tickers, setTickers] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [selectedDataOption, setSelectedDataOption] = useState(dataOptions[0]);
  const [sliderValue, setSliderValue] = useState(7);
  const [xAxisData, setXAxisData] = useState([])
  const [yAxisData, setYAxisData] = useState([])
  const displaySlider = selectedDataOption !== dataOptions[0];
  
  const GetTickers = async () => {
    let response = await client.GetTickers()
    setTickers(response)
  }

  const GetPrices = async () => {
    let response = await client.GetPrices([selectedTicker])
    setPrices(response)
  }

  useEffect(() => {
    GetTickers()
  }, []);

  useEffect(() => {
    if (selectedTicker !== "")
      GetPrices()
  }, [selectedTicker]);

  useEffect(() => {
    if (prices != []){
      let xAxisPriceData = prices === null ? [] : prices[selectedTicker].map(p => p.date)
      let yAxisPriceData = prices === null ? [] : prices[selectedTicker].map(p => Number(p.price))
    
      let xAxisMAData = xAxisPriceData.slice(sliderValue)
      let yAxisMAData = MovingAverage(yAxisPriceData, sliderValue)
  
      setXAxisData(selectedDataOption == dataOptions[0] ? xAxisPriceData : xAxisMAData)
      setYAxisData(selectedDataOption == dataOptions[0] ? yAxisPriceData : yAxisMAData)
    }
  }, [prices, selectedDataOption, sliderValue]);

  const handleTickerChange = (event) => {
    const { _, value } = event.target;
    setSelectedTicker(value)
  }

  const handleDataOptionChange = (event) => {
    const { _, value } = event.target;
    setSelectedDataOption(value)
  }

  return (
    <Grid2>
      <Grid2 container >
        <Grid2 sx={{ p: 2 }} size={3}>
          <Dropdown
            label="Ticker"
            value={selectedTicker}
            setValue={handleTickerChange}
            options={tickers}
          />
        </Grid2>

        <Grid2 sx={{ p: 2 }} size={3}>
          <Dropdown
            label="Data type"
            value={selectedDataOption}
            setValue={handleDataOptionChange}
            options={dataOptions}
          />
        </Grid2>

        <Grid2 sx={{ p: 2 }} size={3}>
          {displaySlider &&
            <InputSlider
              value={sliderValue}
              setValue={setSliderValue}
              label="Window size"
              min={2}
            />
          }
        </Grid2>

      </Grid2>
      <Grid2 sx={{ width: "1000px", p: 2 }}>
        <LineChart1 
          ticker={selectedTicker}
          xAxisData={xAxisData}
          yAxisData={yAxisData}
        />
      </Grid2>
    </Grid2>
  )
}

export default App
