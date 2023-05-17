import { Box, Button } from "@mui/material";
import { StyledTextField } from "../theme/theme";
export const LicensePlatesPicker = ({ licensePlates, setLicensePlates }) => {
  const addPlates = () => {
    setLicensePlates((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const removePlate = (index) => {
    const rows = [...licensePlates];
    rows.splice(index, 1);
    setLicensePlates(rows);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setLicensePlates((s) => {
      const newPlatesArr = s.slice();
      newPlatesArr[index].value = e.target.value;

      return newPlatesArr;
    });
  };
  return (
    <Box sx={{ minWidth: 120 }} mt={3}>
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={addPlates}
      >
        Añadir más Placas
      </Button>
      {licensePlates.map((item, i) => {
        return (
          <Box>
            <StyledTextField
              sx={{ width: 409 }}
              label="Placa"
              margin="normal"
              name="secondaryEmail"
              onChange={handleAdd}
              value={item.value}
              variant="outlined"
              id={i}
              color=""
            />
            {i ? (
              <Button
                sx={{ ml: 2, mt: 2.5 }}
                color="primary"
                size="large"
                variant="contained"
                onClick={() => removePlate(i)}
              >
                Eliminar placa
              </Button>
            ) : null}
          </Box>
        );
      })}
    </Box>
  );
};
