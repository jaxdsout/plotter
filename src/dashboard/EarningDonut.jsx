import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusMap = {
  'not': 0,
  'pend': 1,
  'over': 2,
  'paid': 3
};

function EarningDonut ({ deals }) {
  const [statusEarnings, setStatusEarnings] = useState(Array(4).fill(0)); 

  useEffect(() => {
    if (deals?.length > 0) {
      const earningsByStatus = Array(4).fill(0);

      deals?.forEach(deal => {
        const status = deal.status; 
        const commission = parseFloat(deal.commission) || 0;
        const statusIndex = statusMap[status]; 
        if (statusIndex !== undefined) {
          earningsByStatus[statusIndex] += commission; 
        }
      });

      setStatusEarnings(earningsByStatus);
    }
  }, [deals])

  const data = {
    labels: ['Not Invoiced', 'Pending', 'Overdue', 'Paid'],
    datasets: [
      {
        label: '$',
        data: statusEarnings,
        backgroundColor: ['#5F85DB', '#FABC3F', '#C7253E', '#387F39'],
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
        color: 'white',
      },
      tooltip: {
        backgroundColor: function (tooltipItem) {
          const dataset = tooltipItem.tooltip.dataPoints[0].dataset;
          const index = tooltipItem.tooltip.dataPoints[0].dataIndex;
          return dataset.backgroundColor[index] || 'rgba(0, 0, 0, 0.8)';
        },
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw || 0;
            return `$${value.toLocaleString()}`;
          }
        }
      }
    },
  };

  return(
        <Doughnut 
          data={data} options={options} 
          className='!h-[16rem] !w-[16rem] sm:!h-[16rem] sm:!w-[16rem] md:!h-[24rem] md:!w-[24rem] lg:!h-[24rem] lg:!w-[24rem]'/>
  )
}

const mapStateToProps = state => ({
  deals: state.agent.deals,
});

export default connect(mapStateToProps, { })(EarningDonut);