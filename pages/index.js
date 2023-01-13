import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Searchbar from "../components/Searchbar";
import WeatherStatus from "../components/WeatherStatus";
import Footer from "../components/Footer";
import Head from "next/head";
import Loader from "../components/Loader";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    // Check if geolocation api available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        fetch("/api/getCurrentWeather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coordinates),
        })
          .then((response) => response.json())
          .then((result) => setData(result))
          .catch((err) => console.log(err));
        // TODO : Implement error status
      });
    } else {
      // TODO : Implement error status
      console.log("Geolocation is not available");
    }
  }, []);

  // * Logs change in data

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setData(null);

    const body = {
      query: query,
    };

    fetch("/api/getLocationWeather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
        <title>AtmoSentry - Weather Forecast</title>
      </Head>
      <Layout>
        <Searchbar setQuery={setQuery} />
        {data ? <WeatherStatus data={data} /> : <Loader />}
        <Footer />
      </Layout>
    </div>
  );
};

export default Homepage;
