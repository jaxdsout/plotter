import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// first create field on model: status [not invoiced, pending, paid, overdue ]

// RULES:
// not invoiced DEFAULT
// pending ENABLED BY USER
// overdue OVERWRITES pending 60 DAYS AFTER pending ENABLED
// paid ENABLED BY USER


// then filter by year
// then filter by status
// map the filtered status array

const EarningDonut = () => {
  const data = {
    labels: ['Overdue', 'Not Invoiced', 'Pending', 'Paid'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
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
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default EarningDonut;
