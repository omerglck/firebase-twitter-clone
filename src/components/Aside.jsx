import axios from "axios";
import React, { useEffect, useState } from "react";

const Aside = () => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=41&lon=29&appid=2373995dbd82304ca8dc8117a9b7230b"
      )
      .then((res) => setWeather((res.data.main.temp - 273.15).toFixed(2)));
  }, []);
  console.log(weather);
  return (
    <div className="hidden lg:block p-3">
      <div className="flex justify-center items-center bg-gray-500 px-4 py-2 rounded-lg w-[130px]">
        İstanbul:{weather} <span>°C</span>
      </div>
    </div>
  );
};

export default Aside;
