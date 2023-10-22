import * as React from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

const MuiThemeTest = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });

  return (
    <>
      <Button color="primary">デフォルトのテーマ</Button>
      <ThemeProvider theme={theme}>
        <Button color="primary">テーマ変更後</Button>
      </ThemeProvider>
    </>
  );
};

export default MuiThemeTest;
