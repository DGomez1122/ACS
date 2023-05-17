import { Box } from "@mui/system";
import * as React from "react";
import Chart from "react-apexcharts";
export const HeatMap = ({ values }) => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Lunes",
        data: values[0],
      },
      {
        name: "Martes",
        data: values[1],
      },
      {
        name: "Miércoles",
        data: values[2],
      },
      {
        name: "Jueves",
        data: values[3],
      },
      {
        name: "Viernes",
        data: values[4],
      },
      {
        name: "Sábado",
        data: values[5],
      },
      {
        name: "Domingo",
        data: values[6],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "heatmap",
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        heatmap: {
          radius: 30,
          enableShades: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 50,
                color: "#008FFB",
              },
              {
                from: 51,
                to: 100,
                color: "#00E396",
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
      },
      xaxis: {
        type: "category",
      },
      title: {
        text: "Rounded (Range without Shades)",
      },
    },
  });

  return (
    <Box sx={{ width: "50%", margin: "0 auto", marginTop: 6 }}>
      <Chart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={350}
      />
    </Box>
  );
};

//       <div id="chart">
//   <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
// </div>
