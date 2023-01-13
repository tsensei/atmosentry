import classes from "./WeatherStatus.module.css";
import Image from "next/image";

const getDateStatus = () => {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = date.toLocaleDateString("en-US", options);

  return dateString;
};

const WeatherStatus = ({ data }) => {
  return (
    <div className={classes.status_wrapper}>
      <h1 className={classes.location_header}>
        {data.name}, {data.sys.country}
      </h1>
      <p className={classes.date_header}>{getDateStatus()}</p>
      <p className={classes.temp_header}>
        {data.main.temp}
        <span>°C</span>
      </p>
      <div className={classes.card_one_wrapper}>
        <div className={classes.card_one_icon}>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            height={48}
            width={48}
            alt=''
          />
        </div>
        <p className={classes.card_one_status}>{data.weather[0].main}</p>
        <div className={classes.card_one_minmax_container}>
          <div className={classes.card_one_minmax}>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2.5'
                stroke='white'
                class='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'
                />
              </svg>
            </div>
            <div>{data.main.temp_max}°C</div>
          </div>
          <div className={classes.card_one_minmax}>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='2.5'
                stroke='white'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3'
                />
              </svg>
            </div>
            <div>{data.main.temp_min}°C</div>
          </div>
        </div>
      </div>
      <div className={classes.card_two_wrapper}>
        <div className={classes.card_two_child}>
          <div className={classes.card_two_temp}>{data.main.feels_like}°C</div>
          <div className={classes.card_two_title}>feels like</div>
        </div>
        <div className={classes.card_two_child}>
          <div className={classes.card_two_temp}>{data.main.humidity}%</div>
          <div className={classes.card_two_title}>humidity</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStatus;
