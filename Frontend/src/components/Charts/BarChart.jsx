import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'
import ChartLegend from './ChartLegend'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title)

export function BarChart({ chartData }) {
  const lineOptions = {
    data: {
      labels: chartData.labels,
      datasets: chartData.datasets,
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      plugins: {
        legend: false,
      },
    },
  }
  return (
    <>
      <Bar {...lineOptions} />
      <ChartLegend legends={chartData.legends} />
    </>
  )
}
