import React from 'react';
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         PointElement,
         LineElement,
         Title,
         Tooltip,
         Legend,
         Filler } from "chart.js";

import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const SellsGraphic = ({ sells, days }) => {

    const labels = days

    const data = {
        datasets: [
            {
                label: "Ventas de este mes",
                data: sells,
                borderColor: "#31b189",
                pointBackgroundColor: "#31b189",
                backgroundColor: "#7ace674c"
            },
        ],
        labels
    }
    const options = {
        fill: true,
        responsive: true,
        scales: {
            y: {
                min: 0,
            },
        },
    }

    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    );
};

export default SellsGraphic;