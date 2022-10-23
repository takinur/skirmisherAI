import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from './ChartLegend'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = ({ chartData }) => {
  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: chartData.datasets,

          backgroundColor: ['#6875F5', '#1C64F2', '#0E9F6E', '#F05252', '#1F2937'],
          label: 'Dataset 1',
        },
      ],
      labels: chartData.labels,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="m-auto max-w-[260px] ">
      <Doughnut {...doughnutOptions} />
      <ChartLegend legends={chartData.legends} />
    </div>
  )
}
