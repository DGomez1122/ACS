import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { DashboardPage } from "../components/DashboardPage";
import { Grid, Box } from "@mui/material";
import DashboardCard from "../components/DashboardCard";
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

export default function AdminMenu() {
  const user = JSON.parse(localStorage.getItem("user"));
  document.title = "Menú Principal";
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
          {user.empType == "Admin" ? (
            <>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={"./usersManager.png"}
                  title={"Administrar Usuarios"}
                  route={"/adminMenu/UsersMenu"}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={"./usersManager.png"}
                  title={"Administrar Reservas"}
                  route={"/adminMenu/BookingMenu"}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://equinsaparking.com/wp-content/uploads/2017/11/parking.gif"
                  }
                  title={"Administrar Parqueos"}
                  route={"/adminMenu/ParkingMenu"}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://cdn-icons-png.flaticon.com/512/2235/2235790.png"
                  }
                  title={"Ver Reportes"}
                  route={"/adminMenu/ReportsMenu"}
                />
              </Grid>
            </>
          ) : user.empType == "operator" ? (
            <>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={"./usersManager.png"}
                  title={"Administrar Reservas"}
                  route={"/operatorMenu/BookingMenu"}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://equinsaparking.com/wp-content/uploads/2017/11/parking.gif"
                  }
                  title={"Parqueo Administrado"}
                  route={`/adminMenu/ParkingMenu/ViewParking/${user.parkingLotId}`}
                />
              </Grid>
            </>
          ) : user.empType == "Jefatura" ? (
            <>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://equinsaparking.com/wp-content/uploads/2017/11/parking.gif"
                  }
                  title={"Ver Parqueos"}
                  route={"/ParkingList"}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://brewermaine.gov/wp-content/uploads/2021/06/33-337804_transparent-booking-icon-png-calendar-icon-png-blue.png"
                  }
                  title={"Mis reservas"}
                  route={"/MyProfile/AllReservations"}
                />
              </Grid>

              <Grid item xs={2} sm={2} md={2}>
                <DashboardCard
                  image={
                    "https://cdn-icons-png.flaticon.com/512/2235/2235790.png"
                  }
                  title={"Ver Reportes"}
                  route={"/leaderMenu/ReportsMenu"}
                />
              </Grid>
            </>
          ) : (
            <>
              <>
                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://equinsaparking.com/wp-content/uploads/2017/11/parking.gif"
                    }
                    title={"Ver Parqueos"}
                    route={"/ParkingList"}
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <DashboardCard
                    image={
                      "https://brewermaine.gov/wp-content/uploads/2021/06/33-337804_transparent-booking-icon-png-calendar-icon-png-blue.png"
                    }
                    title={"Mis reservas"}
                    route={"/MyProfile/AllReservations"}
                  />
                </Grid>
              </>
            </>
          )}
        </Grid>
      </Box>
    </DashboardPage>
  );
}
