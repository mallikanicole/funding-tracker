import React from 'react';
import FundingBaChart from './components/FundingBaChart';
import IndustryTrendChart from './components/IndustryTrendChart';
import './App.css';

function App() {
  return (
    <div>
      <h1>Startup Funding Tracker</h1>
      <FundingBaChart />
      <IndustryTrendChart />
    </div>
  );
}

export default App;
