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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

export const lineLegends = [
  { title: 'Application Received', color: 'bg-teal-600' },
  { title: 'Shortlisted', color: 'bg-purple-600' },
]

export function LineChartEmp({ chartData }) {
  console.log('chartData', chartData)

  const lineOptions = {
    data: {
      labels: chartData.week_labels,
      datasets: [
        {
          label: 'Application',

          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: chartData.week_app,
          fill: false,
        },
        {
          label: 'Shortlisted',
          fill: false,

          backgroundColor: '#7e3af2',
          borderColor: '#7e3af2',
          data: chartData.week_invited,
        },
      ],
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
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: false,
    },
  }
  return (
    <>
      <Line {...lineOptions} />
      <ChartLegend legends={lineLegends} />
    </>
  )
}
