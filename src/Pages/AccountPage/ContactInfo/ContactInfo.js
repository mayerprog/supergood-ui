import styles from "./ContactInfo.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/ru";
dayjs.extend(customParseFormat);

dayjs.locale("ru"); // Use the Russian locale globally

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          maxWidth: "320px",
          minWidth: "150px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "grey",
          fontSize: "0.95rem",
          fontFamily: "Inter",
          top: "-2px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderWidth: "1px",
            borderColor: "#ccc",
            borderRadius: "10px",
            height: "50px",
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionEnd: {
          marginTop: "-5px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          marginTop: "-2px",
        },
      },
    },
  },
});

const ContactInfo = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span>Имя</span>
        <input className={styles.input} placeholder="Ваше имя" />
      </div>
      <div className={styles.inputContainer}>
        <span>Эл.почта</span>
        <input className={styles.input} placeholder="Электронная почта" />
      </div>
      <div className={styles.inputContainer}>
        <span>Дата рождения</span>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Введите дату"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="дд/мм/гггг" />
              )}
              format="DD/MM/YYYY"
              mask="__.__.____"
              defaultValue={dayjs("2022-04-17")}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ContactInfo;
