import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function get_all_dates() {
  let current_date = new Date();
  let year = current_date.getFullYear();
  let month = current_date.getMonth();

  let date = new Date(year, month, 1);
  let dates = [];
  let i = 0;

  while (date.getMonth() === month) {
    dates.push((new Date(date)).toISOString().slice(0, 10));
    date.setDate(date.getDate() + 1);
    i = i + 1;
  }
  return dates;
}

function get_current_month_name_and_year() {
  let current_date = new Date();
  return current_date.toLocaleString('default', { month: 'long' }) + " " + current_date.getFullYear().toString();
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart showing blood sugar level in current month.',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Blood pressure [mg/dL]'
      }
    },
    x: {
      title: {
        display: true,
        text: "Days (" + get_current_month_name_and_year() + ")"
      }
    }
  }
};

const labels = get_all_dates();

function getBloodSugars(list) {
  let days = get_all_dates();
  let dates = list.map(e => e.dateAdded);
  let newArr = [];

  days.forEach(e => {
    if (dates.includes(e)) {
      let index = dates.indexOf(e);
      newArr.push(list[index].bloodSugar);
    } else {
      newArr.push(0);
    }
  });
  return newArr.map(t => t.slice(7,10));
}

export function BarChartBloodSugar() {
  const [data, setData] = useState([]);
  const graphData = {
    labels,
    datasets: [
      {
        label: 'Blood sugar level',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    getHealthResultsForMonth();
    setIsShown(true);
  }, [isShown])

  let getHealthResultsForMonth = async () => {
    try {
      let res = await fetch('http://localhost:8080/health-results/patient/current-month', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
      });

      if (res.status === 200) {
        console.log("get health-results succeeded");
        let list = await res.json();
        console.log(list);
        setData(getBloodSugars(list));
      } else {
        console.log("get health-results failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <Bar options={options} data={graphData} />;
}

