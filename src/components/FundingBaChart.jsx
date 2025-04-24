import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FundingBaChart() {
  const [fundingData, setFundingData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/funding.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFundingData(data);

        // Calculate total funding per year
        const fundingByYear = data.reduce((acc, item) => {
          acc[item.year] = (acc[item.year] || 0) + item.amount;
          return acc;
        }, {});

        // Prepare data for the chart
        const years = Object.keys(fundingByYear).sort();
        const totals = years.map((year) => fundingByYear[year]);

        setChartData({
          labels: years,
          datasets: [
            {
              label: 'Total Funding ($)',
              data: totals,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div>
      <h2>Funding Data by Year</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Total Startup Funding by Year',
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default FundingBaChart;