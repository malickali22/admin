import React, { useEffect } from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

const Dashboard = () => {
  console.warn = (message) => {
    if (message.includes('Infinite extent for field "y"')) {
      // Do nothing or log the suppressed warning
    } else {
      // Log other warnings to the console
      console.__warn_original(message);
    }
  };

//  console.__warn_original = console.warn;

  const chartConfigurations = [
    {
        chartId: '64df3384-e2f1-4a42-8e06-240a2e633dce',
        containerId: 'chart1',
        height: '400px',
        width: '600px',
        style: { float: 'left', marginRight: '10px', marginTop: '10px' },
      },
      {
        chartId: '64df6de5-c4a3-47d6-85e9-b60739d3cf55',
        containerId: 'chart2',
        height: '300px',
        width: '250px',
        style: { float: 'left', marginRight: '10px', marginTop: '10px'},
      },
      {
        chartId: '64dfbd36-c4a3-46de-8a8e-b607393f105e',
        containerId: 'chart3',
        height: '400px',
        width: '400px',
        style: { float: 'left', marginRight: '10px', marginTop: '10px' },
      },
      {
        chartId: '64dfac1c-fca2-4312-85cd-652c19fe2a26',
        containerId: 'chart4',
        height: '300px',
        width: '250px',
        style: { clear: 'both', float:'left', marginTop: '20px' },
      },
      {
        chartId: '64dfb2c2-f5ae-4c68-878d-f7a9311d0bdd',
        containerId: 'chart5',
        height: '400px',
        width: '400px', // Adjust the width for the combined charts
        style: { float: 'left', marginTop: '20px' },
      },
    {
      chartId: '64df64dd-98d3-4249-842d-7cf0a1a0d74e',
      containerId: 'chart6',
      height: '400px',
      width: '640px', // Adjust the width for the combined charts
      style: { float: 'left', marginTop: '10px' },
    },

  ];

  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'https://charts.mongodb.com/charts-marketplace_database-jiplb',
    });

    const renderChart = (chartConfig) => {
      const chart = sdk.createChart({
        chartId: chartConfig.chartId,
      });

      const chartContainer = document.getElementById(chartConfig.containerId);
      chart.render(chartContainer).catch(() => console.log("It will Load Automatically "));

      return chart;
    };

    const charts = chartConfigurations.map((config) => renderChart(config));

    const refreshHandler = async () => {
      try {
        await Promise.all(charts.map((chart) => chart.refresh()));
        console.log('Refreshed all charts');
      } catch (error) {
        console.error('Error refreshing charts:', error);
      }
    };

    const refreshButton = document.getElementById('refreshButton');
    refreshButton.addEventListener('click', refreshHandler);

    return () => {
      refreshButton.removeEventListener('click', refreshHandler);
    };
  }, []);

  return (
    <div className="main" style={{ flex:'auto'}}>
      <h1 className="text-center mb-4 mt-4" style={{ fontWeight: '800', color: '#333', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '1px' }}>
        Dashboard
      </h1>
<hr />
<div className='charts-text' style={{display:"flex"}}>
      <h2 className="charts mt-2" style={{ color: 'grey' , marginLeft:'5px' }}>
        Charts
      </h2>
      <button className="btn btn-secondary mt-2 m-1" id="refreshButton" style={{marginLeft:"10px"}}>
        Refresh Charts
      </button>
      </div>
      {chartConfigurations.map((config) => (
        <div key={config.containerId} id={config.containerId} style={{ ...config.style, height: config.height, width: config.width }}></div>
      ))}
      <div id="dashboard" style={{ height: '500px' }}></div>
    </div>
  );
};

export default Dashboard;
