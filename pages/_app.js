import "../styles/globals.css";
import { Montserrat } from "@next/font/google";
// import { Raleway } from "@next/font/google";

const montserrat = Montserrat({
  weight: "variable",
  subsets: ["cyrillic"],
});

// const raleway = Raleway({
//   weight: "variable",
//   subsets: ["latin"],
// });

export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
  );
}
