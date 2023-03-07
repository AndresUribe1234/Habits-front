import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";
import { ThemeProvider } from "@mui/material";
import theme from "./../styles/muiTheme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
