import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Searchbar from "../components/Searchbar";
import WeatherStatus from "../components/WeatherStatus";
import Footer from "../components/Footer";
import Head from "next/head";
import Loader from "../components/Loader";
import ErrorPanel from "../components/ErrorPanel";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    // const getPosition = (position) => {
    //   const coordinates = {
    //     lat: position.coords.latitude,
    //     lon: position.coords.longitude,
    //   };

    //   fetch("/api/getCurrentWeather", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(coordinates),
    //   })
    //     .then(async (response) => {
    //       const data = await response.json();

    //       if (!response.ok) {
    //         const error = data.error;
    //         return Promise.reject(error);
    //       } else {
    //         setData(data);
    //       }
    //     })
    //     .catch((error) => setErrMsg(error));
    // };

    const getPosition = async (position) => {
      const coordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      try {
        const response = await fetch("/api/getCurrentWeather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coordinates),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        } else {
          setData(data);
        }
      } catch (error) {
        setErrMsg(error.message);
      }
    };

    const handleError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setErrMsg(
            "Permission denied for location. Please turn on your location service and try again."
          );
          break;
        case error.POSITION_UNAVAILABLE:
          setErrMsg("Location info is unavailable");
          break;
        case error.TIMEOUT:
          setErrMsg("Request to get location timed out");
          break;
        case error.UNKNOWN_ERROR:
          setErrMsg("An unknown error occured");
          break;
      }
    };
    // Check if geolocation api available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getPosition, handleError);
    } else {
      setErrMsg("Geolocation is not available");
    }
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }

    setData(null);

    const body = {
      query: query,
    };

    const fetchData = async () => {
      try {
        const response = await fetch("/api/getLocationWeather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        } else {
          setData(data);
        }
      } catch (error) {
        setErrMsg(error.message);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <Head>
        <link rel='shortcut icon' href='/favicon.png' />
        <title>AtmoSentry</title>
        <meta
          name='description'
          content='A weather info app built with NextJS and OpenWeatherMap'
        />
        <meta property='og:title' content='AtmoSentry' />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='https://raw.githubusercontent.com/tsensei/atmosentry/main/public/og-img.png'
        />
        <meta property='og:url' content='https://atmosentry.vercel.app' />
      </Head>
      <Layout>
        <Searchbar setQuery={setQuery} />
        {errMsg && <ErrorPanel msg={errMsg} />}
        {data ? <WeatherStatus data={data} /> : <Loader />}
        <Footer />
      </Layout>
    </div>
  );
};

export default Homepage;
