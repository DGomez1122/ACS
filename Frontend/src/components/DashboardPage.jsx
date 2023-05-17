// import React from "react";
// import { Chart } from "../components/Chart";
// import DashboardPage from "../components/DashboardPage";
// // import WeekPicker from "../components/WeekPicker";

// export const Statistics = () => {
//   return (
//     <DashboardPage>
//       <div>
//         <Chart
//           yAxis={[5, 17, 6, 15, 5, 20]}
//           xAxis={[
//             "Lunes",
//             "Martes",
//             "Miercoles",
//             "Jueves",
//             "Viernes",
//             "Sabado",
//           ]}
//         />
//       </div>
//       {/* <WeekPicker /> */}
//     </DashboardPage>
//   );
// };

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
// import React from "react";
import { Chart } from "../components/Chart";
// import DashboardPage from "../components/DashboardPage";
// import WeekPicker from "../components/WeekPicker";

import {
  Grid,
  Typography,
  Divider,
  IconButton,
  List,
  Toolbar,
  CssBaseline,
  Drawer,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const DashboardPage = ({ children, title }) => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const myProfile =
    user.empType === "operator" ? "/MyOperatorProfile" : "/MyProfile";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }), color: grey[50] }}
            // sx={{ color: grey[50] }}
          >
            <MenuIcon sx={{ color: grey[50] }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: grey[50] }} />
            ) : (
              <ChevronRightIcon sx={{ color: grey[50] }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider color="#BB86FC" />
        <List>
          {["Menú Principal", "Cerrar Sesión", "Ver mi perfil"].map(
            (text, index) => (
              <ListItemButton
                key={text}
                onClick={
                  index === 0
                    ? () => navigate("/GeneralMenu", { replace: true })
                    : index === 1
                    ? () => navigate("/", { replace: true })
                    : () => navigate(myProfile, { replace: true })
                }
              >
                <ListItemIcon sx={{ color: grey[50] }}>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <LogoutIcon />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )
          )}
        </List>
      </Drawer>
      <Main sx={{ padding: 0 }} open={open}>
        <DrawerHeader />
        <Box
          className="login-container"
          sx={{
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            overflowX: "hidden",
            width: "100%",
            // py: 20
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};
