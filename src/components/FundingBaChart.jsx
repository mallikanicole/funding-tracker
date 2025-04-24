import React, { useState, useEffect } from 'react';

function FundingBaChart() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/funding.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setFundingData(data))
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div>
      <h2>Funding Data</h2>
      <pre>{JSON.stringify(fundingData, null, 2)}</pre>
    </div>
  );
}

export default FundingBaChart;