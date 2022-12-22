import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import {
  Button,
  StyledLabel,
  StyledBox,
  StyledInput,
  StyledContainer,
  StyledItem,
} from "../styled";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const api_key = process.env.REACT_APP_PRIVATE_KEY;
const base_url = "https://www.alphavantage.co/query?";

const CheckStock = () => {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState();

  const [symbol, setSymbol] = useState("IBM");
  function onChange(e) {
    setSymbol(e.target.value);
  }

  const functionSeries = "TIME_SERIES_INTRADAY";
  //   const symbol = "IBM";
  const interval = "5min";
  const output_size = "full";
  const url = `${base_url}function=${functionSeries}&symbol=${symbol}&interval=${interval}&outputsize=${output_size}&apikey=${api_key}`;

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setData(
      data.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startDate && rowDate <= (endDate ?? new Date());
      })
    );
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setData(
      data.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startDate && rowDate <= (endDate ?? new Date());
      })
    );
  };

  async function fetchData() {
    axios
      .get(url)
      .then((response) => {
        // Extract the time series data from the response
        const time_series = response.data["Time Series (5min)"];
        const errorMsg = response.data["Note"];
        if (errorMsg) {
          setError(response.data["Note"]);
          setData(null);
        }

        // Convert the time series data to a data structure that can be used to populate the table
        const data = Object.entries(time_series).map(([date, prices]) => ({
          date,
          open: prices["1. open"],
          high: prices["2. high"],
          low: prices["3. low"],
          close: prices["4. close"],
        }));
        // Update the state with the data
        setData(data);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {error ? (
        <StyledLabel error>
          You have reached your limit. Refresh the screen after a minute :{" "}
          {error}
        </StyledLabel>
      ) : (
        <>
          {data ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledContainer>
                  <StyledBox>
                    <StyledItem>
                      <StyledInput
                        onChange={onChange}
                        placeholder="Search the Symbol"
                      />
                    </StyledItem>
                    <Button onClick={() => fetchData()}>Search</Button>
                  </StyledBox>

                  <StyledBox>
                    <StyledItem>
                      <StyledLabel>Start date</StyledLabel>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="yyy-MM-dd"
                      />
                    </StyledItem>

                    <StyledItem>
                      <StyledLabel>End date</StyledLabel>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="yyy-MM-dd"
                      />
                    </StyledItem>
                  </StyledBox>
                </StyledContainer>
              </div>
              <h1>{data.length} - Records</h1>
              <Table data={data} />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckStock;
