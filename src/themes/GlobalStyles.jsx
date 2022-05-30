import { Global, css } from "@emotion/react";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
          background-color: #fafafa;
          color: #212121;
        }
      `}
    />
  );
};
