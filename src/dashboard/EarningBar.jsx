import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { connect } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EarningBar ({ deals }) {
  const [monthlyEarnings, setMonthlyEarnings] = useState(Array(12).fill(0)); 


  useEffect(() => {
    if (deals?.length > 0) {
      const earningsByMonth = Array(12).fill(0);

      deals.forEach(deal => {
        const dealDate = new Date(deal.deal_date);
        const month = dealDate.getMonth(); 
        const commission = parseFloat(deal.commission) || 0; 
        earningsByMonth[month] += commission; 
      });

      setMonthlyEarnings(earningsByMonth);
    }
  }, [deals])

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        data: monthlyEarnings,
        backgroundColor: '#5F85DB',
        borderColor: 'rgb(52, 109, 183)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Sales Revenue',
        color: 'white'
      },
      
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Adjust gridline color
          borderColor: 'rgba(255, 255, 255, 0.5)', // Adjust the axis line color
          borderDash: [5, 5], // Make gridlines dashed [lineLength, gapLength]
        },
        ticks: {
          color: 'white', // Adjust tick color
        },
        
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Adjust gridline color
          drawOnChartArea: false, // Disable gridlines across the chart area
        },
        ticks: {
          color: 'white', // Adjust tick color
        },
      },
    },
  };

  return (
        <Bar data={data} options={options} 
        className='!h-[12rem] !w-[24rem] sm:!h-[12rem] sm:!w-[24rem] md:!h-[12rem] md:!w-[24rem] lg:!h-[18rem] lg:!w-[36rem]'/>
  )


}

const mapStateToProps = state => ({
  error: state.auth.error,
  deals: state.agent.deals,
  user: state.auth.user
});

export default connect(mapStateToProps, { })(EarningBar);