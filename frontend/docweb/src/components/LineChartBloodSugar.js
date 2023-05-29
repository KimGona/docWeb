import React from 'react';
import LineChart from './LineChart';
import { faker } from '@faker-js/faker';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Blood sugar',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data1 = {
  labels,
  datasets: [
    {
      label: 'Your blood sugar',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Optimal blood sugar',
      data: labels.map(() => faker.datatype.number({ min: 99, max: 99 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function LineChartBloodSugar({data}) {
  return <LineChart options={options} data={data1} />;
}