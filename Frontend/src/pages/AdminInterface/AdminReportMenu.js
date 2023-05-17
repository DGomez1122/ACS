import { Box, Grid } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import { DashboardPage } from "../../components/DashboardPage";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function ReportAdminMenu() {
  document.title = "Reportes";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <DashboardPage>
      <Box
        className="login-container"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "70%",
          maxWidth: "70%",
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
          wid
        >
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://store-images.s-microsoft.com/image/apps.25871.53baf1fd-a88b-421e-96ea-18e584d3df32.2263e8ca-1f9f-4991-8937-d1c42f79ccc3.2fed0e10-4552-446e-b131-5cabd645b924.png"
              }
              title={"Informe de funcionarios"}
              route={"/UserReport"}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://store-images.s-microsoft.com/image/apps.25871.53baf1fd-a88b-421e-96ea-18e584d3df32.2263e8ca-1f9f-4991-8937-d1c42f79ccc3.2fed0e10-4552-446e-b131-5cabd645b924.png"
              }
              title={"Informe de estacionamientos"}
              route={"/ParkingStats"}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://i.pinimg.com/564x/23/8d/b3/238db337afa4e1cc83b469fedd32fb35--mania-arrow.jpg"
              }
              title={"Estadística por franja horaria"}
              route={"/StatisticsReport"}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://i.pinimg.com/564x/23/8d/b3/238db337afa4e1cc83b469fedd32fb35--mania-arrow.jpg"
              }
              title={"% de ocupación por tipo de espacio"}
              route={"/OccupationByType"}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://i.pinimg.com/564x/23/8d/b3/238db337afa4e1cc83b469fedd32fb35--mania-arrow.jpg"
              }
              title={"% de ocupación por departamento en estacionamiento"}
              route={"/OccupationByDepartment"}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <DashboardCard
              image={
                "https://i.pinimg.com/564x/23/8d/b3/238db337afa4e1cc83b469fedd32fb35--mania-arrow.jpg"
              }
              title={"% de ocupación por departamento"}
              route={"/OccupationByDepartmentGeneral"}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardPage>
  );
}
