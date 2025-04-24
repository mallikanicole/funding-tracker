import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function IndustryTrendChart() {
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
        // Group funding data by industry and year
        const fundingByIndustry = data.reduce((acc, item) => {
          if (!acc[item.industry]) {
            acc[item.industry] = {};
          }
          acc[item.industry][item.year] = (acc[item.industry][item.year] || 0) + item.amount;
          return acc;
        }, {});

        // Prepare data for the chart
        const years = [...new Set(data.map((item) => item.year))].sort();
        const datasets = Object.keys(fundingByIndustry).map((industry) => {
          const industryData = fundingByIndustry[industry];
          return {
            label: industry,
            data: years.map((year) => industryData[year] || 0),
            fill: false,
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            tension: 0.1,
          };
        });

        setChartData({
          labels: years,
          datasets,
        });
      })
      .catch((error) => console.error('Error fetching funding data:', error));
  }, []);

  return (
    <div>
      <h2>Funding Trends by Industry</h2>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Funding Trends by Industry',
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

export default IndustryTrendChart;