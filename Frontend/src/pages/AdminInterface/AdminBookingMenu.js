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

export default function BookingAdminMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

  document.title = "Administrar Usuarios";
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
    <DashboardPage title={"Administración de Reservas"}>
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
        >
          {user.empType == "Admin" ? (
            <>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://icon-library.com/images/new-user-icon/new-user-icon-15.jpg"
                  }
                  title={"Reservar espacio para visitante"}
                  route={"/adminMenu/BookingVisitant"}
                />
              </Grid>
            </>
          ) : (
            user.empType == "operator" && (
              <>
                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://icon-library.com/images/new-user-icon/new-user-icon-15.jpg"
                    }
                    title={"Registrar vehículo oficial"}
                    route={"/adminMenu/AddOfficialVehicle"}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://icon-library.com/images/new-user-icon/new-user-icon-15.jpg"
                    }
                    title={"Editar vehículo oficial"}
                    route={"/adminMenu/OfficialVehiclesList"}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://icon-library.com/images/new-user-icon/new-user-icon-15.jpg"
                    }
                    title={"Liberar espacio de vehículo oficial"}
                    route={"/adminMenu/RemoveBookingOfficialVehicle"}
                  />
                </Grid>

                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://icon-library.com/images/new-user-icon/new-user-icon-15.jpg"
                    }
                    title={"Liberar espacio de visitante"}
                    route={"/adminMenu/RemoveBookingVisitant"}
                  />
                </Grid>
              </>
            )
          )}
        </Grid>
      </Box>
    </DashboardPage>
  );
}
