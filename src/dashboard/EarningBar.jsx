import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { connect } from 'react-redux';
import { readUsedSize } from 'chart.js/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EarningBar ({ deals }) {
  const [monthlyEarnings, setMonthlyEarnings] = useState(Array(12).fill(0)); 

  const monthify_deals = () => {
    if (deals) {
      const earningsByMonth = Array(12).fill(0);

      deals.forEach(deal => {
        const dealDate = new Date(deal.deal_date);
        const month = dealDate.getMonth(); 
        const commission = parseFloat(deal.commission) || 0; 
        earningsByMonth[month] += commission; 
      });

      setMonthlyEarnings(earningsByMonth);
    }
  }

  useEffect(() => {
    if (deals) {
      monthify_deals();
    }
  }, [deals])

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
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
        color: 'black'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
        <Bar data={data} options={options} style={{ height: "18rem"}}/>
  )


}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  deals: state.agent.deals,
  user: state.auth.user
});

export default connect(mapStateToProps, { })(EarningBar);