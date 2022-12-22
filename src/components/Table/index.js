import React from "react";

const Table = ({ data }) => {
  let records = data.length;
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };

  const tdStyle = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Index {records}</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Open</th>
          <th style={thStyle}>High</th>
          <th style={thStyle}>Low</th>
          <th style={thStyle}>Close</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.date}>
            <td style={tdStyle}>{records--}</td>
            <td style={tdStyle}>{row.date}</td>
            <td style={tdStyle}>{row.open}</td>
            <td style={tdStyle}>{row.high}</td>
            <td style={tdStyle}>{row.low}</td>
            <td style={tdStyle}>{row.close}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
