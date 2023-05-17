import { Box, Grid } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardPage } from "../../components/DashboardPage";
import OutsourcedParkingCard from "../../components/OutSourcedParkingCard";
import ParkingCard from "../../components/ParkingCard";
const drawerWidth = 240;

export function SelectParkingLot({ onClick }) {
  document.title = "Parqueos";
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [parkingList, setParkingList] = React.useState([]);
  const [outsourcedParkingList, setOutsourcedParkingList] = React.useState([]);

  const parseShift = (shift) => {
    let result = "";
    var obj = JSON.parse(shift);

    for (let i = 0; i < obj.length; i++) {
      if (obj[i].periods.length > 0) {
        result += obj[i].day;
        result += ": ";
        for (let y = 0; y < obj[i].periods.length; y++) {
          result += dayjs(obj[i].periods[y].start).format("h:mm A");
          result += " - ";
          result += dayjs(obj[i].periods[y].end).format("h:mm A");

          if (y !== obj[i].periods.length - 1) {
            result += ", ";
          }
        }
        result += "\n";
      }
    }
    console.log(result);
    return result;
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:9000/api/parkingLot`)
      .then((res) => {
        setParkingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:9000/api/outsourcedParkingLot`)
      .then((res2) => {
        setOutsourcedParkingList(res2.data);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <Box
      className="login-container"
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        // py: 20
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1 }}
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent={"center"}
      >
        {parkingList.map((parking) => (
          <Grid item xs={2} sm={2} md={2}>
            <ParkingCard
              onClick={onClick}
              title={parking.name}
              spaces={
                "Espacios totales: " +
                (
                  parking.officialVehicles +
                  parking.leadershipFields +
                  parking.generalUsers +
                  parking.visitors +
                  parking.specialFields
                ).toString()
              }
              description={parking.location}
              schedule={parseShift(parking.shift)}
              id={parking.id}
              empType={user.empType}
            />
          </Grid>
        ))}

        {outsourcedParkingList.map((parking) => (
          <Grid item xs={2} sm={2} md={2}>
            <OutsourcedParkingCard
              onClick={onClick}
              title={parking.name}
              spaces={
                "Espacios totales: " +
                (
                  parking.officialVehicles +
                  parking.leadershipFields +
                  parking.generalUsers +
                  parking.visitors +
                  parking.specialFields
                ).toString()
              }
              description={parking.location}
              schedule={parseShift(parking.shift)}
              id={parking.id}
              empType={user.empType}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
