import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart({ yAxis, xAxis }) {
  console.log("From props", yAxis, xAxis);

  const options = {
    axisY: {
      title: "Bounce Rate",
    },
    axisX: {
      title: "Week of Year",
    },

    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "CANTIDAD DE PERSONAS", color: "white" },
        grid: {
          color: "white",
        },
        ticks: {
          beginAtZero: true,
          color: "white",
          //   fontSize: 12,
        },
      },
      x: {
        title: { display: true, text: "FRANJA HORARIA", color: "white" },
        grid: {
          drawBorder: true,
          color: "white",
        },
        ticks: {
          beginAtZero: true,
          color: "white",
          //   fontSize: 20,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        color: "white",
      },
      title: {
        display: false,
        text: "s Line CChart.jhart",
        color: "white",
      },

      legend: {
        // display: false,
        labels: {
          color: "white",
        },
      },
    },
  };

  const labels = xAxis;

  const data = {
    labels,
    datasets: [
      {
        label: "Lunes",
        data: yAxis[0],
        borderColor: "#A394FF",
        backgroundColor: "#A394FF",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Martes",
        data: yAxis[1],
        borderColor: "yellow",
        backgroundColor: "yellow",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Miércoles",
        data: yAxis[2],
        borderColor: "blue",
        backgroundColor: "blue",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Jueves",
        data: yAxis[3],
        borderColor: "red",
        backgroundColor: "red",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Viernes",
        data: yAxis[4],
        borderColor: "aqua",
        backgroundColor: "aqua",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Sábado",
        data: yAxis[5],
        borderColor: "green",
        backgroundColor: "green",
        color: "#fff",
        pointRadius: 5,
      },
      {
        label: "Domingo",
        data: yAxis[6],
        borderColor: "orange",
        backgroundColor: "orange",
        color: "#fff",
        pointRadius: 5,
      },
    ],
  };

  return (
    <Box
      sx={{ width: "60vw", height: "70vh", margin: "0 auto" }}
      justifyContent={"center"}
      display={"flex"}
    >
      <Line options={options} data={data} />
    </Box>
  );
}
