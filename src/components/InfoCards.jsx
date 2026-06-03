import WeatherCard from "./WeatherCard";

function InfoCards({ humidity, wind, pressure, visibility, uv }) {
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <WeatherCard
          icon="humidity"
          label="Umidade"
          value={humidity}
          unit="%"
        />
        <WeatherCard
          icon="wind"
          label="Vento"
          value={wind.split(" ")[0]}
          unit={wind.split(" ")[1] + " " + wind.split(" ")[2]}
        />
        <WeatherCard
          icon="pressure"
          label="Pressão"
          value={pressure}
          unit="mb"
        />
        <WeatherCard
          icon="visibility"
          label="Visibilidade"
          value={visibility}
          unit="km"
        />
        <WeatherCard icon="uv" label="Índice UV" value={uv} />
      </div>
    </section>
  );
}

export default InfoCards;
