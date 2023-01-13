export default async function handler(req, res) {
  const coordinates = {
    lat: req.body.lat,
    lon: req.body.lon,
  };

  const apiKey = process.env.apiKey;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    );
    const result = await response.json();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "some error happened",
    });
  }
}
