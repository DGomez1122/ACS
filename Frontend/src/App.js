import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import GeneralMenu from "./pages/GeneralMenu";
import UsersAdminMenu from "./pages/AdminInterface/AdminUsersMenu";
import ParkingAdminMenu from "./pages/AdminInterface/AdminParkingMenu";
import BookingAdminMenu from "./pages/AdminInterface/AdminBookingMenu";
import NewParking from "./pages/Parking/NewParking";
import EditParking from "./pages/Parking/EditParking";
import EditOutsourcedParking from "./pages/Parking/EditOutsourcedParking";
import ParkingReport from "./pages/Reports/ParkingReport";
import NewUser from "./pages/NewUser";
import NewOperator from "./pages/Operator/NewOperator";
import MyProfile from "./pages/MyProfile";
import AllReservations from "./pages/AllReservations";
import MyOperatorProfile from "./pages/Operator/MyOperatorProfile";
import ReportsMenu from "./pages/AdminInterface/AdminReportMenu";
import FindUser from "./pages/AdminInterface/AdminFindUser";
import ParkingList from "./pages/Parking/ParkingListAdmin";
import UserProfile from "./pages/userProfile";
import FindOperator from "./pages/AdminInterface/AdminFindOperator";
import ViewParking from "./pages/Operator/ViewParking";
import UserList from "./pages/Reports/UserList";
import ParkingSpaceList from "./pages/Parking/ParkingSpaceList";
import EditOperator from "./pages/Operator/EditOperator";
import { Statistics } from "./pages/Reports/Statistics";
import { UsersReport } from "./pages/UsersReport";
import BookingVisitant from "./pages/BookingVisitant";
import AddOfficialVehicle from "./pages/AddOfficialVehicle";
import { OfficialVehiclesList } from "./pages/OfficialVehiclesList";
import EditOfficialVehicle from "./pages/EditOfficialVehicle";
import { BookingOfficialVehicle } from "./pages/BookingOfficialVehicle";
import { RemoveBookingVisitant } from "./pages/RemoveBookingVisitant";
import { RemoveBookingOfficialVehicle } from "./pages/RemoveBookingOfficialVehicle";
import { OccupationByType } from "./pages/Reports/OccupationByType";
import { OccupationByDepartment } from "./pages/Reports/OccupationByDepartment";
import { OccupationByDepartmentGeneral } from "./pages/Reports/OccupationByDepartmentGeneral";
import ParkingStats from "./pages/Reports/ParkingStats";
import ParkingListInfo from "./pages/Parking/ParkingListInfo";

export const App = () => {
  if (localStorage.getItem("user") === null) localStorage.setItem("user", "");
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ParkingList" element={<ParkingList />} />
        <Route
          path="/ParkingList/ParkingSpaceList/:id"
          element={<ParkingSpaceList />}
        />
        <Route path="/UserReport" element={<UserList />} />
        <Route path="/GeneralMenu" element={<GeneralMenu />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route
          path="/MyProfile/AllReservations"
          element={<AllReservations />}
        />
        <Route path="/MyOperatorProfile" element={<MyOperatorProfile />} />
        <Route path="/generalMenu" element={<GeneralMenu />} />
        <Route path="/adminMenu/UsersMenu" element={<UsersAdminMenu />} />
        <Route path="/adminMenu/BookingMenu" element={<BookingAdminMenu />} />
        <Route
          path="/operatorMenu/BookingMenu"
          element={<BookingAdminMenu />}
        />
        <Route
          path="/adminMenu/BookingVisitant"
          element={<BookingVisitant />}
        />
        <Route
          path="/adminMenu/RemoveBookingVisitant"
          element={<RemoveBookingVisitant />}
        />
        <Route
          path="/adminMenu/RemoveBookingOfficialVehicle"
          element={<RemoveBookingOfficialVehicle />}
        />
        <Route
          path="/adminMenu/BookingOfficialVehicle"
          element={<BookingOfficialVehicle />}
        />
        <Route
          path="/adminMenu/AddOfficialVehicle"
          element={<AddOfficialVehicle />}
        />
        <Route
          path="/adminMenu/EditOfficialVehicle/:id"
          element={<EditOfficialVehicle />}
        />
        <Route
          path="/adminMenu/OfficialVehiclesList"
          element={<OfficialVehiclesList />}
        />
        <Route path="/adminMenu/ParkingMenu" element={<ParkingAdminMenu />} />
        <Route path="/adminMenu/ReportsMenu" element={<ReportsMenu />} />
        <Route path="/leaderMenu/ReportsMenu" element={<ReportsMenu />} />
        <Route path="/StatisticsReport" element={<Statistics />} />
        <Route path="/OccupationByType" element={<OccupationByType />} />
        <Route
          path="/OccupationByDepartment"
          element={<OccupationByDepartment />}
        />
        <Route path="/ParkingListInfo" element={<ParkingListInfo />} />
        <Route
          path="/OccupationByDepartmentGeneral"
          element={<OccupationByDepartmentGeneral />}
        />
        <Route path="/UserReport" element={<UsersReport />} />
        <Route path="/ParkingStats" element={<ParkingStats />} />
        <Route
          path="/StatisticsReport/ParkingReport"
          element={<ParkingReport />}
        />
        <Route path="/adminMenu/FindUser" element={<FindUser />} />
        <Route path="/adminMenu/userProfile/:id" element={<UserProfile />} />
        <Route path="/adminMenu/FindOperator" element={<FindOperator />} />
        <Route path="/adminMenu/editOperator/:id" element={<EditOperator />} />
        <Route
          path="/adminMenu/ParkingMenu/NewParking"
          element={<NewParking />}
        />
        <Route
          path="/adminMenu/ParkingMenu/EditParking/:id"
          element={<EditParking />}
        />
        <Route
          path="/adminMenu/ParkingMenu/ViewParking/:id"
          element={<ViewParking />}
        />
        <Route
          path="/adminMenu/ParkingMenu/EditOutsourcedParking/:id"
          element={<EditOutsourcedParking />}
        />
        <Route path="/adminMenu/UsersMenu/NewUser" element={<NewUser />} />
        <Route
          path="/adminMenu/UsersMenu/NewOperator"
          element={<NewOperator />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};
