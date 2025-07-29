import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../store/themeSlice';

Chart.register(...registerables);

export default function StatsChart({ data }) {
  const chartRef = useRef(null);
  const { mode } = useTheme();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Users',
            data: data.users,
            backgroundColor: mode === 'dark' ? 'rgba(54, 162, 235, 0.7)' : 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Orders',
            data: data.orders,
            backgroundColor: mode === 'dark' ? 'rgba(255, 99, 132, 0.7)' : 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: mode === 'dark' ? '#fff' : '#333'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: mode === 'dark' ? '#fff' : '#333'
            },
            grid: {
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            ticks: {
              color: mode === 'dark' ? '#fff' : '#333'
            },
            grid: {
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [data, mode]);

  return <canvas ref={chartRef} />;
}