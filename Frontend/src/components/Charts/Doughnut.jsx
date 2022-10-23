import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from './ChartLegend'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = ({ chartData }) => {
  const doughnutLegends = [
    { title: 'Shirts', color: 'bg-blue-500' },
    { title: 'Shoes', color: 'bg-teal-600' },
    { title: 'Bags', color: 'bg-purple-600' },
  ]

  const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [33, 33, 33],

          backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
          label: 'Dataset 1',
        },
      ],
      labels: ['Shoes', 'Shirts', 'Bags'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  }

  return (
    <>
      <Doughnut {...doughnutOptions} />
      <ChartLegend legends={doughnutLegends} />
    </>
  )
}
