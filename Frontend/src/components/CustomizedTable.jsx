import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C1B1F",
    color: "#A394FF",
    fontWeight: "bold",
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    backgroundColor: "black",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& th": {
    border: 0,
  },
  "& td": {
    border: 0,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    border: 0,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 5,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("22/05/2022", 159),
  createData("23/05/2022", 237),
  createData("24/05/2022", 262),
  createData("25/05/2022", 305),
  createData("26/05/2022", 356),
];

let labels = [
  "1-2:59am",
  "3-4:59am",
  "5-6:59am",
  "7-8:59am",
  "9-10:59am",
  "11-12:59pm",
  "1-2:59pm",
  "3-4:59pm",
  "5-6:59pm",
  "7-8:59pm",
  "9-10:59pm",
  "11-12:59am",
];

let days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function CustomizedTables({ tableRows }) {
  console.log("tableRows", tableRows);
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "100%", margin: "0 auto", marginTop: 6 }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Día</StyledTableCell>
            {labels.map((label, idx) => (
              <StyledTableCell key={idx}>{label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, rowIdx) => (
            <StyledTableRow key={days[rowIdx]}>
              {row.map((day, idx) => {
                if (idx == 0) {
                  return (
                    <>
                      <StyledTableCell key={`${rowIdx}-${idx}-day`}>
                        {days[rowIdx]}
                      </StyledTableCell>
                      <StyledTableCell key={`${rowIdx}-${idx}`}>
                        {day}
                      </StyledTableCell>
                    </>
                  );
                } else {
                  return (
                    <StyledTableCell key={`${rowIdx}-${idx}`}>
                      {day}
                    </StyledTableCell>
                  );
                }
              })}
              {/* <StyledTableCell component="th" scope="row">
                {row.day}
              </StyledTableCell>
              <StyledTableCell align="right">{row.value}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
