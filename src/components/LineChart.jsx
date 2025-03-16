import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export function LineChart1({ ticker = "", xAxisData = [], yAxisData = [] }) {
    const data = {
        labels: xAxisData === null ? labels: xAxisData,
        datasets: [
            {
                label: ticker,
                data: yAxisData === null ? labels.map(() => 15): yAxisData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],

    };
    return <Line options={options} data={data} />;
}