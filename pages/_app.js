import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/store/auth-context";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </AuthContextProvider>
  );
}
