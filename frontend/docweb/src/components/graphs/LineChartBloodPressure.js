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
      text: 'Blood pressure',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data1 = {
  labels,
  datasets: [
    {
      label: 'Your blood pressure systolic',
      data: labels.map(() => faker.datatype.number({ min: 50, max: 250 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'Your blood pressure diastolic',
        data: labels.map(() => faker.datatype.number({ min: 20, max: 160 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Optimal blood pressure systolic',
      data: labels.map(() => faker.datatype.number({ min: 120, max: 120 })),
      borderColor: 'rgb(192, 192, 192)',
      backgroundColor: 'rgba(192, 192, 192, 0.5)',
    },
    {
        label: 'Optimal blood pressure diastolic',
        data: labels.map(() => faker.datatype.number({ min: 80, max: 80 })),
        borderColor: 'rgb(119,136,153)',
        backgroundColor: 'rgba(119,136,153, 0.5)',
      },
  ],
};

export default function LineChartBloodPressure({data}) {
  return <LineChart options={options} data={data1} />;
}