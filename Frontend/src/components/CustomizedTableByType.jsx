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
    border: 2,
    color: "#A394FF",
    borderTop: "1px solid #A394FF",
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

export default function CustomizedTableByType({
  keys,
  values,
  keysHeader,
  valuesHeader,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", margin: "0 auto", marginTop: 6 }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{keysHeader}</StyledTableCell>
            <StyledTableCell align="right">{valuesHeader}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map((row, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {row}
              </StyledTableCell>
              <StyledTableCell align="right">{values[idx]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
