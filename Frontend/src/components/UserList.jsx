import * as React from "react";
import { DataGrid, esES } from "@mui/x-data-grid";

const columns = [
  { field: "id", header: "Numero", type: "string", width: 80 },
  {
    field: "identification",
    headerName: "Identificación",
    type: "string",
    width: 170,
  },
  { field: "fullName", headerName: "Nombre", type: "string", width: 300 },
  {
    field: "institutionalMail",
    headerName: "Correo Institucional",
    type: "string",
    width: 300,
  },
  {
    field: "phoneNumber",
    headerName: "Telefono",
    type: "string",
    width: 160,
  },
  {
    field: "department",
    headerName: "Departamento",
    type: "string",
    width: 300,
  },
];

export default function DataGridDemo({ rows }) {
  return (
    <div style={{ height: 631, width: "100%" }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-booleanCell": {
            color: "primary.main",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "primary.contrastText",
          },
          "& .MuiDataGrid-menuIcon": {
            color: "primary.contrastText",
          },
          "& .MuiDataGrid-menuIconButton": {
            color: "primary.contrastText",
          },
          "& .MuiDataGrid-filterIcon": {
            color: "primary.contrastText",
          },
          "& .MuiDataGrid-iconButtonContainer": {
            color: "primary.main",
          },
          "& .MuiDataGrid-iconSeparator": {
            color: "primary.main",
          },
          "& .MuiDataGrid-filterFormDeleteIcon": {
            color: "primary.main",
          },
          "& GridCloseIcon": {
            color: "primary.main",
          },
          "& .MuiDataGrid-row": {
            color: "primary.contrastText",
          },
        }}
      />
    </div>
  );
}
