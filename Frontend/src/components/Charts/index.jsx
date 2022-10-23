import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import ChartLegend from './ChartLegend'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title)

export function LineChart({ chartData }) {
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
      <Line {...lineOptions} />
      <ChartLegend legends={chartData.legends} />
    </>
  )
}
