import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(()=> {
    const getExchangeRate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        console.log(response.data.rates[toCurrency]);
        console.log(response.data.rates);
        setExchangeRate(response.data.rates[toCurrency]);
      }
      catch(err){
        console.log(err);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if(exchangeRate!==null){
      setConvertedCurrency((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value);
  }

  return (
    <>
      <div className="currency-converter">
        <div className="box">
        </div>
        <div className="data">
          <h1>Currency converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount</label>
            <input type="number" id="amt" value={amount} onChange={handleAmountChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency</label>
            <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCuurency">To Currency</label>
            <select id="toCuurency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedCurrency} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
