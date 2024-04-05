import styles from "./UserInfo.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/ru";
import { useState } from "react";
dayjs.extend(customParseFormat);

dayjs.locale("ru"); // Use the Russian locale globally

const mainColor = "#e9bc5b";

const theme = createTheme(
  {
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            minWidth: "414px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "grey",
            fontSize: "0.95rem",
            fontFamily: "Inter",
            top: "-5px",
            "&.Mui-focused": {
              color: mainColor, // Label color when the TextField is focused
            },
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
              height: "46px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: mainColor,
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          positionEnd: {
            marginTop: "-7px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            marginTop: "-6px",
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            "&.MuiPickersDay-root.Mui-selected": {
              backgroundColor: mainColor,
            },
            "&.Mui-selected": {
              backgroundColor: mainColor,
            },
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true, // Globally disables the ripple effect for all IconButton components
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          root: {
            zIndex: 10001, // Ensure this is higher than the modal's z-index
          },
        },
      },
    },
  },
  ruRU
);

const UserInfo = ({ userInfoRef, toggleUserInfoVisibility }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const maximumDate = new Date("2023-1-1");
  const minimumDate = new Date("1930-1-1");

  return (
    <div className={styles.container} ref={userInfoRef}>
      <h2>Мои данные</h2>

      <div className={styles.inputContainer}>
        <span>Имя</span>
        <input className={styles.input} placeholder="Ваше имя" />
      </div>
      <div className={styles.inputContainer}>
        <span>Эл.почта</span>
        <input className={styles.input} placeholder="Электронная почта" />
      </div>
      <div className={styles.inputContainer}>
        <span>Телефон</span>
        <span className={styles.phone}>8 (977) 589 7234</span>
      </div>
      <div className={styles.inputContainer}>
        {/* <span>Дата рождения</span> */}
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
              label="Введите дату рождения"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              format="DD.MM.YYYY"
              mask="__.__.____"
              defaultValue={dayjs("2022-04-17")}
              minDate={dayjs("1930-01-01")}
              maxDate={dayjs("2023-01-01")}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonStyle}
          onClick={() => console.log("Save")}
        >
          <span className={styles.buttonText}>Сохранить</span>
        </button>
        <button
          className={styles.buttonStyle}
          onClick={toggleUserInfoVisibility}
        >
          <span className={styles.buttonText}>Отмена</span>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
