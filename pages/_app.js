import "../styles/globals.css";
import { Montserrat } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  weight: "variable",
  subsets: ["cyrillic"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
