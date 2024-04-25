import { useCallback, memo, useContext } from "react";
import { DailyForecast } from "@/typings/types";
import Image from "next/legacy/image";
import { WardrobeContext } from "@/providers/WardrobeProvider";
import styles from "./weatherCard.module.scss";
import classNames from "classnames";

interface WeatherCardProps {
  isSelected: boolean;
  isError: boolean;
  isPlaceHolder: boolean;
  dailyForecast: DailyForecast | null;
  selectDailyForecast?: (dailyForecast: DailyForecast) => void;
}

function WeatherCard({
  isSelected,
  isError,
  isPlaceHolder,
  dailyForecast,
  selectDailyForecast,
}: WeatherCardProps): React.JSX.Element {
  const handleSelectDailyForecast = useCallback(() => {
    if (selectDailyForecast && dailyForecast) {
      selectDailyForecast(dailyForecast);
    }
  }, [selectDailyForecast, dailyForecast]);

  const { avatar } = useContext(WardrobeContext);

  const gradient = dailyForecast?.color;

  const cardStyle = isSelected
    ? {
        background: gradient,
      }
    : {};

  return (
    <>
      {isError && (
        <div className={styles.cardDiv}>
          <div className="top-section"></div>
          <div className="bottom-section"></div>
        </div>
      )}
      {isPlaceHolder && (
        <div className={classNames(styles.clickableCard, styles.placeholder)}>
          <div
            className={classNames(styles.cardSection, styles.topSection)}
            style={
              {
                background: "#D3D3D3",
              } as React.CSSProperties
            }
          >
            <div className={styles.leftColumn}></div>
            <div className={styles.rightColumn}>
              <h1>Rain</h1>
              <h2>15°</h2>
            </div>
            <h3>Mockday</h3>
            <p>H:12°C L:7°C</p>
          </div>
          <div className={classNames(styles.cardSection, styles.bottomSection)}>
            <div className={styles.leftColumn}>
              <h3>Wind</h3>
              <h3>Clouds</h3>
              <h3>Humidity</h3>
            </div>
            <div className={styles.rightColumn}>
              <p>10 km/h</p>
              <p>80%</p>
              <p>50%</p>
            </div>
          </div>
        </div>
      )}
      {dailyForecast && (
        <div
          className={classNames(styles.clickableCard, {
            [styles.selected]: isSelected,
          })}
          onClick={handleSelectDailyForecast}
          style={cardStyle as React.CSSProperties}
        >
          <div
            className={classNames(styles.cardSection, styles.topSection)}
            style={
              {
                background: gradient,
                boxShadow: `0 4px 8px ${gradient}`,
                color: dailyForecast?.weather === "Snow" ? "black" : "white",
              } as React.CSSProperties
            }
          >
            <div className={styles.leftColumn}>
              {dailyForecast.iconPath !== "error.png" && (
                <Image
                  src={dailyForecast.iconPath}
                  width={80}
                  height={80}
                  alt={dailyForecast.weather}
                ></Image>
              )}
              {avatar?.isComplete && avatar.head !== undefined && (
                <div className={styles.avatar}>
                  <Image
                    src={avatar.head.image.src}
                    width={avatar.head.image.width * 0.3}
                    height={avatar.head.image.height * 0.3}
                    alt={avatar.head.image.alt}
                  ></Image>
                </div>
              )}
            </div>
            <div className={styles.rightColumn}>
              <h1>{dailyForecast.weather}</h1>
              <h2>
                {dailyForecast.temp.current
                  ? `${dailyForecast.temp.current}°`
                  : `${dailyForecast.temp.max}°`}
              </h2>
            </div>
            <h3>{dailyForecast.day}</h3>
            <p>
              {`H:${Math.round(dailyForecast.temp.max)}°C L:${Math.round(
                dailyForecast.temp.min
              )}°C`}
            </p>
          </div>
          <div className={classNames(styles.cardSection, styles.bottomSection)}>
            <div className={styles.leftColumn}>
              <h3>Wind</h3>
              <h3>Clouds</h3>
              <h3>Humidity</h3>
            </div>
            <div className={styles.rightColumn}>
              <p style={{ whiteSpace: "nowrap" }}>{`${
                dailyForecast.wind_direction
              }${` `}${dailyForecast.wind_speed}${` km/h`}`}</p>
              <p>{`${dailyForecast.clouds}%`}</p>
              <p>{`${dailyForecast.humidity}%`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(WeatherCard);
