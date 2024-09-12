import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

function EarningDonut ({ deals }) {
  const [statusEarnings, setStatusEarnings] = useState(Array(4).fill(0)); 
  const statusMap = {
    'not': 0,
    'pend': 1,
    'over': 2,
    'paid': 3
  };

  const statusfy_deals = () => {
    if (deals) {
      const earningsByStatus = Array(4).fill(0);

      deals.forEach(deal => {
        const status = deal.status; 
        const commission = parseFloat(deal.commission) || 0;
        const statusIndex = statusMap[status]; 
        if (statusIndex !== undefined) {
          earningsByStatus[statusIndex] += commission; 
        }
      });

      setStatusEarnings(earningsByStatus);
    }
  }

  useEffect(() => {
    if (deals) {
      statusfy_deals();
    }
  }, [deals])

  const data = {
    labels: ['Not Invoiced', 'Pending', 'Overdue', 'Paid'],
    datasets: [
      {
        label: 'Sales',
        data: statusEarnings,
        backgroundColor: ['rgba(54, 162, 235)', 'rgba(255, 206, 86)', 'rgba(255, 99, 132)', 'rgba(75, 192, 192)'],
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
        text: 'Invoice Status',
        color: 'black'
      },
    },
  };

  return(
        <Doughnut data={data} options={options}/>
  )
}

const mapStateToProps = state => ({
  deals: state.agent.deals,
});

export default connect(mapStateToProps, { })(EarningDonut);