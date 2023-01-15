var NodeGeocoder = require("node-geocoder");
var geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: process.env.geocodeApiKey,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.apiKey;

  const query = req.body.query;

  if (!query) {
    res.status(400).json({
      error: "Query not defined",
    });
  }

  console.log(query);

  try {
    const geoResponse = await geocoder.geocode(query);
    if (geoResponse.length === 0) {
      return res.status(400).json({
        error: "Invalid location",
      });
    }

    const coordinates = {
      lat: geoResponse[0].latitude,
      lon: geoResponse[0].longitude,
    };

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    );

    const result = await weatherResponse.json();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Some error occured",
    });
  }
}
