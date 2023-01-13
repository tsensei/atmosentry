import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Searchbar from "../components/Searchbar";
import WeatherStatus from "../components/WeatherStatus";
import Footer from "../components/Footer";

const Homepage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("render");
    // Check if geolocation api available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        fetch("/api/currentWeather", {
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

  return (
    <div>
      <Layout>
        <Searchbar />
        {data ? <WeatherStatus data={data} /> : <p>...</p>}
        <Footer />
      </Layout>
    </div>
  );
};

export default Homepage;
