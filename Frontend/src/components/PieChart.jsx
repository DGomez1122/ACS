import * as React from "react";
import Chart from "react-apexcharts";

export const PieChart = ({ labels, values }) => {
  console.log(labels, values);
  const [state, setState] = React.useState({
    options: {
      dataLabels: {},
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
              labels: {
                colors: "red",
              },
            },
          },
        },
      ],
    },
  });

  return (
    <Chart options={state.options} series={values} type="pie" width={520} />
  );
};
