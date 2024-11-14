import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AppointmentsGraphProps {
  appointments: any[];
}

const AppointmentsGraph: React.FC<AppointmentsGraphProps> = ({ appointments }) => {
  const appointmentCounts = appointments.reduce((acc, appointment) => {
    const date = new Date(appointment.dateAppointment).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(appointmentCounts),
    datasets: [
      {
        label: 'rendez-vous par jour',
        data: Object.values(appointmentCounts),
        backgroundColor: 'rgba(10, 137, 153, 0.6)',
        borderColor: 'rgb(10, 137, 153)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'wh', // This will inherit text color based on dark mode
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)', // Light gray in light mode
          borderColor: 'rgba(156, 163, 175, 0.2)',
        },
      },
      x: {
        ticks: {
          color: 'wh', // This will inherit text color based on dark mode
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          borderColor: 'rgba(156, 163, 175, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'wh', // This will inherit text color based on dark mode
        },
      },
    },
  };

  return (
    <div className="h-64 dark:bg-gray-800 dark:text-gray-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AppointmentsGraph;
